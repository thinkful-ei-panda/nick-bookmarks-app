import mainView from './main-view.js';
import api from './api.js';
import store from './store.js';

const main = function () {
  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
      mainView.checkForLoadInitialView();
    });

  mainView.bindEventListeners();
  mainView.checkForLoadInitialView();
};

$(main);