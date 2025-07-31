import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    //Somehow, the API returned the recipe 'Key Lime Pie' when dealing with a non-existing query
    if (Array.isArray(data.results) && data.results.length > 0) {
      const isKeyLimePie = data.results[0].title;
      const isSingleRecipe = data.results.length;

      if (isKeyLimePie === 'Key lime pie' && isSingleRecipe === 1) {
        return this.renderError();
      }
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (Array.isArray(data.results) && data.results.length > 0) {
      const isKeyLimePie = data.results[0].title;
      const isSingleRecipe = data.results.length;

      if (isKeyLimePie === 'Key lime pie' && isSingleRecipe === 1) {
        return this.renderError();
      }
    }

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      //Updating the changed TEXTS
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;

      //Updating the changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
            <p>${message}</p>
            </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
              <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
          <p>${message}</p>
          </div>
            `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    console.log('Error appeared at:', this._parentElement);
  }
}
