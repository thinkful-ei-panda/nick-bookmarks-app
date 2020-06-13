import store from './store.js';

function initialViewTemplate() {
  return `
    <div class="no-bookmarks">
      <img src="/images/logo-no-text.png" alt="new-bookmark" />
      <h2>No bookmarks!</h2>
      <button id="add-bookmark-button" class="button-lit active-button">Add bookmark</button>
    </div>
  `;
}

function listViewTemplate() {
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
    if (store.bookmarks[i].rating >= store.filter) {
      finalListString += listItemTemplate(
        store.bookmarks[i].id,
        store.bookmarks[i].url,
        store.bookmarks[i].title,
        store.bookmarks[i].rating,
        store.bookmarks[i].desc,
        store.bookmarks[i].expanded
      );
    }
  }
  return finalListString;
}

function listItemTemplate(id, url, title, rating, description, expanded) {

  const starArray = [];
  let collapsibleContent = '';

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starArray[i] = '<img src="/images/star-lit.png" alt="Lit Star" />';
    } else {
      starArray[i] = '<img src="/images/star-unlit.png" alt="Unlit Star" />';
    }
  }

  if (expanded) {
    collapsibleContent = `
      <div class="collapsible-content">
        <p>
        ${description}
        </p>
        <div class="force-row space-between">
          <div>
            <button data-item-id="${id}" type="button" class="delete-button active-button">Delete</button>
          </div>
          <form action="${url}" target="_blank">
            <input id="visit-button" class="button-lit active-button" type="submit" value="Visit Site" />
          </form>
        </div>
      </div> 
    `;
  }

  return `
    <li class="collapsible list-item">
      <button data-item-id="${id}" type="button" class="collapsible-button active-button">
        <h2>${title}</h2>
        <div class="stars">
          ${starArray[4]} ${starArray[3]} ${starArray[2]} ${starArray[1]} ${starArray[0]}
          </div>
      </button>
        ${collapsibleContent}
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

    <div class="error-container"></div>
    <div class="create-item-box">
      <section>
        <h2>New bookmark</h2>
      </section>
      <form action="" method="post" id="js-creation-form">
        <section>
          <label for="url">Insert url:</label>
          <input type="url" id="url-input" name="url" placeholder="http://randomsite.com" required>
        </section>
        <section class="ten-margin-top">
          <label for="title">Title:</label>
          <input type="text" id="title-input" name="title" placeholder="Name of Bookmark" required>
        </section>
        <section>
          <div class="stars ten-margin-top">
            ${createStarRatingTemplate()}
          </div>
        </section>
        <section>
          <label for="description">Description:</label>
          <textarea id="description" name="description" placeholder="write a description......"></textarea>
        </section>
        <section id="bottom-create" class="force-row space-between">
          <input  id="js-cancel-add" class="button-unlit set-width active-button" type="button" value="Cancel"></input>
          <input id="js-create-button" class="button-lit set-width active-button" type="submit" value="Create">
        </section>
      </form>
    </div>  
  `;
}

function footerTemplate() {
  let filterMenu = '';

  if (store.filterMenuOpen) {
    filterMenu = `
      <button class="filter-button force-row active-button" name="filter 5 stars only">
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" />
        <p>only</p> 
      </button>
      <button class="filter-button force-row active-button" name="filter 4 stars and up">
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <p>& up</p>
      </button>
      <button class="filter-button force-row active-button" name="filter 3 stars and up">
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" />  
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <p>& up</p>
      </button>
      <button class="filter-button force-row active-button" name="filter 2 stars and up">
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <p>& up</p>
      </button>
      <button class="filter-button force-row active-button" name="filter 1 star and up">
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-unlit.png" alt="Unlit Star" /> 
        <img src="/images/star-lit.png" alt="Lit Star" /> 
        <p>& up</p>
      </button>
    `;
  }

  return `
    <button id="add-bookmark-button" class="nav-button active-button"><img src="/images/new-button.png" alt="new-bookmark" /></button>
    <div class="dropup">
      <button class="nav-button drop-button active-button"><img src="/images/filter-button.png" alt="filter" /></button>
      <div class="dropup-content">
        ${filterMenu}
      </div>
    </div>  
  `;
}

const generateError = function (message) {
  return `
      <section class="error-content">
        <p>${message}</p>
      </section>
    `;
};

export default {
  initialViewTemplate,
  listViewTemplate,
  createViewTemplate,
  footerTemplate,
  createStarRatingTemplate,
  generateError
};