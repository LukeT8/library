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

// Initial loading of books when the page loads
updateBooks();

// Function to regenerate the HTML and update the DOM
function updateBooks() {
  const bookContainer = document.getElementById('books-grid');
  bookContainer.textContent = ''; // Clear the existing content

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-container');

    const titleElement = document.createElement('h4');
    titleElement.textContent = book.title;
    bookDiv.appendChild(titleElement);

    const authorElement = document.createElement('h4');
    authorElement.textContent = `Author: ${book.author}`;
    bookDiv.appendChild(authorElement);

    const pagesElement = document.createElement('h4');
    pagesElement.textContent = `Pages: ${book.pages}`;
    bookDiv.appendChild(pagesElement);

    const statusElement = document.createElement('h4');
    statusElement.textContent = book.isRead ? "I've read" : "Not read yet";
    bookDiv.appendChild(statusElement);

    const removeButton = document.createElement('button');
    removeButton.classList.add('button', 'remove-button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBookFromLibrary(index);
      updateBooks();
    });
    bookDiv.appendChild(removeButton);

    bookContainer.appendChild(bookDiv);
  });
}

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
  updateBooks();
});

function removeBookFromLibrary(index) {
  console.log("printing index: " + index);
  myLibrary.splice(index, 1);
}

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

// Add event listener to the "Close" button in the popup form
const closeButton = document.getElementById('close-form');
closeButton.addEventListener('click', hideAddBookForm);




