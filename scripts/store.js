let bookmarks = [];

let adding = false;
let inputRating = 0;
let error = null;
let filterMenuOpen = false;
let filter = 0;

function findById(id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
}

function addBookmark(item) {
  this.bookmarks.push(item);
}

function setExpansionsFalse() {
  this.bookmarks.forEach((bookmark) => {
    if (bookmark.expanded)
      bookmark.expanded = false;
  });
}

function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
}

function setError(error) {
  this.error = error;
}

export default {
  bookmarks,
  adding,
  inputRating,
  error,
  filterMenuOpen,
  filter,
  findById,
  addBookmark,
  setExpansionsFalse,
  findAndDelete,
  setError

};