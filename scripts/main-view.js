import templates from './templates.js';
import store from './store.js';

//render function
function render(content) {
  $('main').html(content);
}

//event listener to enter the create view
function handleClickAddBookmarkButton() {
  $('body').on('click', '#add-bookmark-button', function () {
    event.preventDefault();
    render(templates.createViewTemplate);
    $('Footer').hide();
  });
}

//event listener for cancel button on create view
function handleClickCancelAddButton() {
  $('main').on('click', '#js-cancel-add', function (event) {
    event.preventDefault();
    checkForLoadInitialView();
  });
}

//checks whether to load the initial view or list ivew
function checkForLoadInitialView() {
  if (store.store.bookmarks.length > 0 && store.store.display === true) { //remove display
    render(templates.listViewTemplate);
  } else {
    render(templates.initialViewTemplate);
  }
  $('Footer').show();

}

//sets all event handlers
function bindEventListeners() {
  handleClickAddBookmarkButton();
  handleClickCancelAddButton();
  checkForLoadInitialView();
}

export default {
  bindEventListeners,
  render
};