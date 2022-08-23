import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886 recipe url
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bce0d recipe url

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // Guard clause
    if (!id) return;

    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipes));
