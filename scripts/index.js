import mainView from './main-view.js';

const main = function () {
  mainView.bindEventListeners();
  mainView.render();
};

$(main);