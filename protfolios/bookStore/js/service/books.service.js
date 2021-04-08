var STORAGE_KEY = 'booksDB';
var gSortBy = 'txt'
var gBooks;
var booksList = ['Broken', 'Caul baby', 'Gold diggers', 'Of woman and salt', 'The good sister', 'The last bookshop in england'];


function getBooks() {
    _createBooks()
    return gBooks;
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        var books = booksList.map((book) => {
            return _createBook(book);
        });
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _createBook(name, price = Math.floor(Math.random() * 200)) {
    var newBook = {
        id: _makeId(),
        name,
        price,
        imgUrl: `pics/${name}.jpg`,
        bookRate: 0
    }
    return newBook;
}

function changeRate(val, bookId) {
    var book = getBookById(bookId);
    var bookIdx = _findBookIdx(book)
    gBooks[bookIdx].bookRate = val;
    _saveBooksToStorage()
}

function updateBook(book, bookPrice) {
    var bookIdx = _findBookIdx(book)
    gBooks[bookIdx].price = bookPrice
    _saveBooksToStorage()
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function addBook(book) {
    var newBook = _createBook(book.name, book.price)
    gBooks.push(newBook)
    _saveBooksToStorage()
}

function removeBook(bookId) {
    var newBooks = gBooks.filter(book => book.id !== bookId)
    console.log('newBooksArray', newBooks)
    gBooks = newBooks
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}



function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _findBookIdx(foundBook) {
    return gBooks.findIndex((book) => book === foundBook)
}