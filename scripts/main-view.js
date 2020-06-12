import templates from './templates.js';

function render(content) {
  $('main').html(content);
}

function handleClickAddBookmarkButton() {
  $('body').on('click', '#add-bookmark-button', function () {
    render(templates.createViewTemplate);
    $('Footer').hide();
  });
}

function checkForLoadInitialView() {
  //have an if statement to see if there is anything in the store
  //if not
  render(templates.initialViewTemplate);
  $('Footer').show();
}

function bindEventListeners() {
  handleClickAddBookmarkButton();
  checkForLoadInitialView();
}

export default {
  bindEventListeners,
  render
};