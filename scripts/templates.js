import store from './store.js';

function initialViewTemplate() {
  return `
    <div class="no-bookmarks">
      <img src="/images/logo-no-text.png" alt="new-bookmark" />
      <h2>No bookmarks!</h2>
      <button id="add-bookmark-button" class="button-lit">Add bookmark</button>
    </div>
  `;
}

function listViewTemplate() {

  //we will pass store into generateListItems
  const allListItemString = generateListItems();

  let result =
    `<ul class="bookmarks-list">
      ${allListItemString}
    </ul>
  `;

  return result;
}

function generateListItems() {
  let finalListString = '';

  for (let i = 0; i < store.bookmarks.length; i++) {

    finalListString += listItemTemplate(
      store.bookmarks[i].id,
      store.bookmarks[i].title,
      store.bookmarks[i].rating,
      store.bookmarks[i].description
    );
  }

  return finalListString;
}

function listItemTemplate(id, title, rating, description) {

  const starArray = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starArray[i] = '<img src="/images/star-lit.png" alt="Lit Star" />';
    } else {
      starArray[i] = '<img src="/images/star-unlit.png" alt="Unlit Star" />';
    }
  }

  return `
    <li class="collapsible list-item">
      <button data-item-id="${id}" type="button" class="collapsible-button">
        <h2>${title}</h2>
        <div class="stars">
          ${starArray[4]} ${starArray[3]} ${starArray[2]} ${starArray[1]} ${starArray[0]}
        </button>
      </div>
      <div class="collapsible-content">
        <p> 
          ${description}
        </p>
        <div class="center">
          <button data-item-id="${id}" type="button" class="delete-button">Delete</button>
        </div>
      </div>  
    </li>
  `;
}

function createStarRatingTemplate() {
  let startString = '';
  let sourceImage = '';

  for (let i = 5; i > 0; i--) {
    if (i <= store.inputRating) {
      sourceImage = 'lit';
    } else {
      sourceImage = 'unlit';
    }

    startString += `<img id="ratingStar" src="/images/star-${sourceImage}.png" alt="rate ${i}" />`;
  }
  return startString;
}

function createViewTemplate() {
  return `
    <div class="create-item-box">
      <section>
        <h2>New bookmark</h2>
      </section>
      <form action="" method="post" id="js-creation-form">
        <section>
          <label for="url">Insert url:</label>
          <input type="url" id="url-input" name="url" placeholder="http://randomsite.com">
        </section>
        <section>
          <label for="title">Title:</label>
          <input type="text" id="title-input" name="title" placeholder="Name of Bookmark">
        </section>
        <section>
          <div class="stars">
            ${createStarRatingTemplate()}
          </div>
        </section>
        <section>
          <label for="description">Description:</label>
          <textarea id="description" name="description" placeholder="write a description......"></textarea>
        </section>
        <section class="force-row">
          <input  id="js-cancel-add" class="button-unlit set-width" type="button" value="Cancel"></input>
          <input id="js-create-button" class="button-lit set-width" type="submit" value="Create">
        </section>
      </form>
    </div>  
  `;
}

function footerTemplate() {
  let filterMenu = '';

  if (store.filterMenuOpen) {
    filterMenu = `
      <p>Filter Option</p>
      <p>Filter Option</p>
      <p>Filter Option</p>
      <p>Filter Option</p>
    `;
  }

  return `
    <button id="add-bookmark-button" class="nav-button"><img src="/images/new-button.png" alt="new-bookmark" /></button>
    <div class="dropup">
      <button class="nav-button drop-button"><img src="/images/filter-button.png" alt="filter" /></button>
      <div class="dropup-content">
        ${filterMenu}
      </div>
    </div>  
  `;
}

export default {
  initialViewTemplate,
  listViewTemplate,
  createViewTemplate,
  footerTemplate,
  createStarRatingTemplate
};