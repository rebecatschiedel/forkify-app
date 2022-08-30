import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'Error message here!';
  _message = ' ';

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and no other pages
    if (this._data.page === 1 && numPages === 1) return;

    // Page 1 and other pages
    if (this._data.page === 1 && numPages > 1)
      return this._generateMarkupRightButton();

    // Last page
    if (this._data.page === numPages) return this._generateMarkupLeftButton();

    // Other pages
    return `${this._generateMarkupLeftButton()} ${this._generateMarkupRightButton()}`;
  }

  _generateMarkupLeftButton() {
    return `
    <button data-goto=${
      this._data.page - 1
    } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
    </button>`;
  }

  _generateMarkupRightButton() {
    return `
    <button data-goto=${
      this._data.page + 1
    } class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button> 
    `;
  }
}

export default new PaginationView();
