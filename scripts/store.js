let bookmarks = [
  {
    id: 'yepID',
    title: 'Google Top',
    rating: 0,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit',
    expanded: false
  },
  {
    id: '6ffw',
    title: 'Youtube',
    rating: 4,
    url: 'http://www.title2.com',
    description: 'dolorum tempore deserunt',
    expanded: false
  }
];

let adding = false;
let inputRating = 0;
let error = null;
let filterMenuOpen = false;
let filter;

const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

export default {
  bookmarks,
  adding,
  inputRating,
  error,
  filterMenuOpen,
  filter,
  findById,
  findAndDelete

};