document.addEventListener("DOMContentLoaded", function () {

  const inputBook = document.getElementById("inputBook");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");

  inputBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });



  inputBookIsComplete.addEventListener("input", function (event) {
    event.preventDefault();
    checkButton();
  });

  if (isStorageAvailable()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Buku berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
