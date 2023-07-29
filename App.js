let book1 = new Book("Overlord", "Kugane Maruyama", 600, true);
let book2 = new Book("Lapis no Shinzou", "Opossum", 400, true);
let book3 = new Book("Tower of Karma", "Keyaki Fujita", 400, true);
let book4 = new Book("Inherit The Stars", "James P. Hogan", 216, false);

let myLibrary = [];
myLibrary.push(book1, book2, book3, book4);
let booksHtml = '';

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.isRead ? "read" : "not read yet"
  }`;
};

function loadBooks(myLibrary){// array
  myLibrary.forEach(book => {
    const bookHTML = `
    <div class="book-container">
      <h4>${book.title}</h4>
      <h4>Author: ${book.author}</h4>
      <h4>Pages: ${book.pages}</h4>
      <h4>Status: ${book.isRead ? 'I\'ve read' : 'Not read yet'}</h4>
      <button class="button remove-button">Remove</button>
    </div>
  `;
  booksHtml += bookHTML;
  console.log("loadBooks executed")
  });

  // Add a "Remove" button for each book
  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeBookFromLibrary(index);
      // Regenerate the HTML and update the DOM after removal
      booksHtml = '';
      loadBooks(myLibrary);
      const bookContainer = document.getElementById('books-grid');
      bookContainer.innerHTML = booksHtml;
    });
  });
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

const bookContainer = document.getElementById('books-grid');
loadBooks(myLibrary);
bookContainer.innerHTML = booksHtml;

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Function to display the form to add a new book
function showAddBookForm() {
  const form = document.getElementById('add-book-form');
  form.style.display = 'block';
}

// Function to hide the form after submission
function hideAddBookForm() {
  const form = document.getElementById('add-book-form');
  form.style.display = 'none';
}

// Add event listener to the "Add New Book" button
const addBookButton = document.getElementById('add-book-button');
addBookButton.addEventListener('click', showAddBookForm);

// Add event listener to the "Submit" button in the form
const submitBookButton = document.getElementById('submit-book-button');
submitBookButton.addEventListener('click', () => {
  // Get values from the form input fields
  const title = document.getElementById('title-input').value;
  const author = document.getElementById('author-input').value;
  const pages = document.getElementById('pages-input').value;
  const isRead = document.getElementById('is-read-input').checked;

  // Create a new Book object
  const newBook = new Book(title, author, pages, isRead);

  // Add the new book to the library
  addBookToLibrary(newBook);

  // Hide the form after submission
  hideAddBookForm();

  // Clear the form input fields
  document.getElementById('title-input').value = '';
  document.getElementById('author-input').value = '';
  document.getElementById('pages-input').value = '';
  document.getElementById('is-read-input').checked = false;

  // Regenerate the HTML and update the DOM
  booksHtml = '';
  loadBooks(myLibrary);
  const bookContainer = document.getElementById('books-grid');
  bookContainer.innerHTML = booksHtml;
});

// Add event listener to the "Close" button in the popup form
const closeButton = document.getElementById('close-form');
closeButton.addEventListener('click', hideAddBookForm);