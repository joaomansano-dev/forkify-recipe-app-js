import previewView from './previewView.js';
import View from './View.js';

import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'Sorry! We could not find your bookmark! Find a recipe and bookmark it :)';
  _message = '';

  addHandlerRenderBookmarks(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
