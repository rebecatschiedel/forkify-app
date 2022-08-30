import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';

// Parcel
// if (module.hot) {
//   module.hot.accept();
// }

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    // Guard clause
    if (!query) return;

    resultsView.renderSpinner();

    // Loading search results
    await model.loadSearchResult(query);

    // Rendering limited number of recipes from search result
    resultsView.render(model.getSearchResultPage(4));
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
