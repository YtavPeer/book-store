'use strict';

var gBooks;
var gChoosenBook;
const STORAGE_KEY = 'BOOKS';
var gSortBy;
var gBooksName = ['billie', 'honey moon', 'jerry spinely', 'more great', 'not free america', 'once chance', 'secret', 'the last print', 'venge']
const PAGE_BOOK_SIZE = 4;
var gPageIdx = 0;
_createBooks()


function getBooks() {
    var books = _getBooks()
    var startIdx = gPageIdx * PAGE_BOOK_SIZE;
    return books.slice(startIdx, startIdx + PAGE_BOOK_SIZE);
}

function getBook(id) {
    var choosenBook = _getBook(id)
    gChoosenBook = choosenBook;
    return gChoosenBook;
}

function removeBook(id) {
    _removeBooks(id);
    _saveBooksToStorage()
}

function addBook(name, price) {
    _addBook(name, price);
    _saveBooksToStorage()
}

function updateBook(id, newPrice) {
    _updateBook(id, newPrice);
    _saveBooksToStorage()
}

function updateBookRate(value) {
    return _updateBookRate(value)
    _saveBooksToStorage()
}

function updateSortBy(value) {
    gSortBy = value;
}

function getSortBy() {
    return gSortBy;
}

function nextPage(num) {
    if (gPageIdx === 0 && num === -1) return;
    gPageIdx += num;
    if (gPageIdx * PAGE_BOOK_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function nextSpecificPage(pageNum) {
    gPageIdx = pageNum;
}

//private function
function _getBooks() {
    return gBooks;
}

function _getBook(id) {
    return gBooks.find(function (book) {
        return book.id === id;
    })
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = gBooksName.map(function (book) {
            return _createBook(book);
        })
    }
    gBooks = books;
    _saveBooksToStorage()
}

function _createBook(value, price = getRandomIntInclusive(30, 100)) {
    return {
        id: makeId(),
        title: value,
        price: price,
        rate: getRandomIntInclusive(1, 10),
        imageUrl: `./img/${value}.jpg`
    }
}

function _removeBooks(id) {
    var currIdx = gBooks.findIndex(function (book) {
        return book.id === id;
    })
    gBooks.splice(currIdx, 1);
}

function _addBook(name, price) {
    var newBook = _createBook(name, price);
    gBooks.push(newBook);
}

function _updateBook(id, newPrice) {
    var currIdx = gBooks.find(function (book) {
        return book.id === id;
    })
    currIdx.price = newPrice;
}

function _updateBookRate(value) {
    var currIdx = gBooks.find(function (book) {
        return book.id === gChoosenBook.id;
    })
    if (currIdx.rate === 10 && value === 1 || currIdx.rate === 0 && value === -1) return;
    currIdx.rate += value;
    return currIdx.rate;
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}




