'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var count = 1
    var books = getBooks()
    var elTable = document.querySelector('.books-table')
    var strHtml = '<th>Id</th><th>Title</th><th>Price</th><th class="action-cell">Action</th><tbody>'
    books.forEach((book) => {
        var bookId = book.id;
        var actionTableStr = `<table class="action-table"><tr><td><button class="read-btn" onclick="onReadBook('${bookId}')">Read</button></td><button class="update-btn" onclick="onUpdateBook('${bookId}')">Update</button></td><button class="remove-btn" onclick="onRemoveBook('${bookId}')">Remove</button></td></tr></table >` 
        strHtml += `<tr><td>${count++}</td><td>${book.name}</td><td>${book.price}</td><td>${actionTableStr}</td></tr>`
    })
    strHtml += '</tbody>'
    elTable.innerHTML = strHtml
}

function onChangeRate(val, bookId) {
    changeRate(val, bookId);
}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none';
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal')
    var elReadContainer = elModal.querySelector('.read-container');
    elReadContainer.querySelector('h3').innerText = book.name
    elReadContainer.querySelector('img').src = book.imgUrl
    elReadContainer.querySelector('p').innerText = makeLorem(50)
    elReadContainer.querySelector('.rate').innerHTML = `<input type="number" min="0" max="10" step="1" onchange="onChangeRate(this.value, '${bookId}')" value="${book.bookRate}"/>`
    elReadContainer.style.display = 'flex';
    elModal.style.display = 'flex';
}

function onUpdateBook(bookId) {
    var book = getBookById(bookId)
    var bookPrice = +prompt(`Enter new book price for ${book.name}`)
    updateBook(book, bookPrice)
    renderBooks()
}

function onAddModal() {
    document.querySelector('.modal').style.display = 'flex'
    document.querySelector('.add-container').style.display = 'flex';
}

function onAddBook(ev) {
    ev.preventDefault();
    var elModal = document.querySelector('.modal')
    var elAddContainer = elModal.querySelector('.add-container');
    var newBook = {
        name: elAddContainer.querySelector('input[name="bookName"]').value,
        price: elAddContainer.querySelector('input[name="bookPrice"]').value
    }
    addBook(newBook)
    renderBooks()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}



