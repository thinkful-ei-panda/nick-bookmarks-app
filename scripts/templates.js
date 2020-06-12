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
  //will use store and listItemTemplate to generate all list items into one lare string 
  let finalListString = '';

  for (let i = 0; i < store.store.bookmarks.length; i++) {

    finalListString += listItemTemplate(store.store.bookmarks[i].title, store.store.bookmarks[i].rating);
  }
  //then return that large string

  //for test purposes we will just call list tempalte once with values and push it through

  return finalListString;
}

function listItemTemplate(title, rating) {

  const starArray = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starArray[i] = '<img src="/images/star-lit.png" alt="Lit Star" />';
    } else {
      starArray[i] = '<img src="/images/star-unlit.png" alt="Unlit Star" />';
    }
  }

  return `
    <li class="list-item">
      <h2 class="list-title">${title}</h2>
      <div class="stars">
        ${starArray[4]}
        ${starArray[3]}
        ${starArray[2]}
        ${starArray[1]}
        ${starArray[0]}
      </div>
    </li>
  `;
}

function createViewTemplate() {
  return `
    <div class="create-item-box">
      <section>
        <h2>New bookmark</h2>
      </section>
      <form action="" method="post">
        <section>
          <label for="url">Insert url:</label>
          <input type="url" id="url-input" name="url" placeholder="http://randomsite.com">
        </section>
        <section>
          <div class="stars">
            <img src="/images/star-unlit.png" alt="new-bookmark" />
            <img src="/images/star-lit.png" alt="new-bookmark" />
            <img src="/images/star-lit.png" alt="new-bookmark" />
            <img src="/images/star-lit.png" alt="new-bookmark" />
            <img src="/images/star-lit.png" alt="new-bookmark" />
          </div>
        </section>
        <section>
          <label for="description">Description:</label>
          <textarea id="title" name="description" placeholder="write a description......"></textarea>
        </section>
        <section class="force-row">
          <input  id="js-cancel-add" class="button-unlit set-width" type="button" value="Cancel"></input>
          <input class="button-lit set-width" type="submit" value="Create">
        </section>
      </form>
    </div>  
  `;
}



export default {
  initialViewTemplate,
  listViewTemplate,
  createViewTemplate
};