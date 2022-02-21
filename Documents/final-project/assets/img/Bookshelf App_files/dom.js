const UNCOMPLETED_READ_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_READ_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function createBook(title, author, year, isComplete) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const bookAction = document.createElement("div");
  bookAction.classList.add("action");
  if (isComplete) {
    bookAction.append(createUndoButton(), createTrashButton());
  } else {
    bookAction.append(createCheckButton(), createTrashButton());
  }

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(bookTitle, bookAuthor, bookYear, bookAction);

  return container;
}

function createUndoButton() {
  return createButton("gray", "Not finished",   function (event) {
    undoCompletedBook(event.target.parentElement.parentElement);
  });
}

function createTrashButton() {
  return createButton("red", "Delete", function (event) {
    removeBook(event.target.parentElement.parentElement);
  });
}

function createCheckButton() {
  return createButton("green", "Finished", function (event) {
    addCompletedBook(event.target.parentElement.parentElement);
  });
}

function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.innerText = buttonText;
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
}

function addBook() {
  const incompleteBookshelfList = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
  const completeBookshelfList = document.getElementById(COMPLETED_READ_BOOK_ID);
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const book = createBook(bookTitle, `Penulis: ${bookAuthor}`, `Tahun: ${bookYear}`, isComplete);
  const bookObject = bookAsObject(bookTitle, bookAuthor, bookYear, isComplete);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (isComplete) {
    completeBookshelfList.append(book);
  } else {
    incompleteBookshelfList.append(book);
  }
  updateDataToStorage();
}

function addCompletedBook(bookElement) {
  const completeBookshelfList = document.getElementById(COMPLETED_READ_BOOK_ID);
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
  const bookYear = bookElement.querySelectorAll("p")[1].innerText;

  const newBook = createBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = true;
  newBook[BOOK_ITEMID] = book.id;

  completeBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function removeBook(bookElement) {
  const isDelete = window.confirm("Are you sure?");
  if (isDelete) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
    alert("Done!");
  } else {
    alert("Please select the book to delete");
  }
}

function undoCompletedBook(bookElement) {
  const incompleteBookshelfList = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
  const bookYear = bookElement.querySelectorAll("p")[1].innerText;

  const newBook = createBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = false;
  newBook[BOOK_ITEMID] = book.id;

  incompleteBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}



function checkButton() {
  const span = document.querySelector("span");
  if (inputBookIsComplete.checked) {
    span.innerText = "Selesai dibaca";
  } else {
    span.innerText = "Belum selesai dibaca";
  }
}

