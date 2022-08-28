import View from './View';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = ' ';

  _generateMarkup() {
    console.log(`here ${this._data}`);
    //return `${this._data.map(this._generateMarkupPreview)}`;
    return `${this._data.map(r => `<li>Hi</li>`).join('')}`;
  }

  _generateMarkupPreview(recipe) {
    console.log(`here 2 ${recipe}`);
    result`
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
                <figure class="preview__fig">
                    <img src=${recipe.image} alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}.</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                    <div class="preview__user-generated">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li>
        `;
  }
}

export default new PreviewView();
