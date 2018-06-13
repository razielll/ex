'use strict';

var gBooks = [];
var BOOKS = 'Books'

function createBooks() {

    var books = loadFromStorage(BOOKS)

    if (!books || books.length === 0) {
        books = []
        books.push(createBook('Learn coding', '20$', 'basic introduction to coding'))
        books.push(createBook('Play with coding', '25$', 'make games!'))
        books.push(createBook('Master coding', '50$', 'inspiring and enthrilling book'))
        saveToStorage(BOOKS, books)
    }
    gBooks = books;
}

function createBook(name, price, description) {
    return {
        name: name,
        price: price,
        desc: description,
        pic: null,
        id: getRandomInt()
    }
}

function updateBook(ev, bookId, newPrice) {
    ev.stopPropagation();
    var bookIdx = getBookIdxById(bookId);
    gBooks[bookIdx].price = newPrice
    saveToStorage(BOOKS, gBooks);
}

function deleteBook(bookId) {
    var bookIdx = getBookIdxById(bookId);
    gBooks.splice(bookIdx, 1);
    saveToStorage(BOOKS, gBooks);
}



function readBook(bookId) {
    var idx = getBookIdxById(bookId)
    var currBook = gBooks[idx]
    $('.description').html(gBooks[idx].desc)
    gBooks[idx].pic = `img/${idx}.jpg`
    document.querySelector('.book-pic').setAttribute('src', ` ${gBooks[idx].pic}`)
}


function getInput() {
    document.querySelector('.input-field').classList.toggle('show-input')
}