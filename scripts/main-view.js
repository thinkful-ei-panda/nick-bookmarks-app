import templates from './templates.js';
import store from './store.js';
import api from './api.js';

const renderError = function () {
  if (store.error) {
    const errorHTML = templates.generateError(store.error);
    $('.error-container').html(errorHTML);
  } else {
    $('.error-container').empty();
  }
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

//render function
function render(destination, content) {
  $(destination).html(content);
}

//event listener to enter the create view
function handleClickNewBookmarkButton() {
  $('body').on('click', '#add-bookmark-button', function () {
    event.preventDefault();
    render('main', templates.createViewTemplate);
    store.filterMenuOpen = false;
    store.setExpansionsFalse();
    render('footer', '');
  });
}

//event listener for cancel button on create view
function handleClickCancelAddButton() {
  $('main').on('click', '#js-cancel-add', function (event) {
    event.preventDefault();
    checkForLoadInitialView();
  });
}

//event listener for cancel button on create view
function handleClickCreateButton() {
  $('main').on('submit', '#js-creation-form', function (event) {
    event.preventDefault();

    const title = $(event.currentTarget)[0][1].value;
    const rating = store.inputRating;
    const url = $(event.currentTarget)[0][0].value;
    const desc = $(event.currentTarget)[0][2].value;

    const newBookmark = {
      title,
      rating,
      url,
      desc,
      expanded: false
    };

    api.createBookmark(newBookmark)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        checkForLoadInitialView();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
    store.inputRating = 0;
  });

  //remember to reset store.inputRating to 0
}

function handleRatingStars() {
  $('main').on('click', '#ratingStar', function (event) {
    event.preventDefault();
    //get the value of the star clicked and set store.inputRating to that value
    store.inputRating = parseInt($(event.currentTarget)[0].alt[5]);

    render('.stars', templates.createStarRatingTemplate());
  });
}

function handleEnterPressRatingStars() {
  $('main').on('keypress', '#ratingStar', function (event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      store.inputRating = parseInt(document.activeElement.alt[5]);
      render('.stars', templates.createStarRatingTemplate());
    }
  });
}

function handleClickFilterButton() {
  $('footer').on('click', '.drop-button', function (event) {
    event.preventDefault();
    store.filterMenuOpen = !store.filterMenuOpen;
    render('footer', templates.footerTemplate());
  });
}

function handleClickFiltering() {
  $('footer').on('click', '.filter-button', function (event) {
    event.preventDefault();
    //get the value of the filter clicked and set store.filter to that value
    store.filter = parseInt($(event.currentTarget)[0].name[7]);

    checkForLoadInitialView();
  });
}

function handleClickListItem() {
  $('main').on('click', '.collapsible-button', function (event) {
    event.preventDefault();

    //find the id of the item clicked
    const id = getItemIdFromElement(event.currentTarget);
    //use the id to find the item in store
    const item = store.findById(id);
    //set the expanded bool to the opposite of what it currently is 
    item.expanded = !item.expanded;

    render('main', templates.listViewTemplate());
  });
}

function getItemIdFromElement(item) {
  return $(item)
    .data('item-id');
}

//event listener for cancel button on create view
function handleClickDeleteButton() {
  $('main').on('click', '.delete-button', function (event) {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);

    api.deleteItem(id)
      .then(() => {
        store.findAndDelete(id);
        checkForLoadInitialView();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

//checks whether to load the initial view or list ivew
function checkForLoadInitialView() {
  if (store.bookmarks.length > 0) {
    render('main', templates.listViewTemplate);
    store.filterMenuOpen = false;
    render('footer', templates.footerTemplate());
  } else {
    render('main', templates.initialViewTemplate);
  }
}

//sets all event handlers
function bindEventListeners() {
  handleClickNewBookmarkButton();
  handleClickCancelAddButton();
  handleClickCreateButton();
  handleClickFilterButton();
  handleRatingStars();
  handleClickListItem();
  handleClickDeleteButton();
  handleCloseError();
  handleClickFiltering();
  handleEnterPressRatingStars();
  checkForLoadInitialView();
}

export default {
  bindEventListeners,
  checkForLoadInitialView
};