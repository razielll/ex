'use strict';
console.log('hello');


function init() {
    createBooks();
    renderBooks();
}

function renderBooks() {
    var strHTML = ''

    gBooks.forEach(function (book) {
        strHTML +=
            `<tr>
        <td>${book.id} </td>
        <td>${book.name} </td>
        <td>${book.price} </td>
        <td>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal" onclick="onReadBook(${book.id})">
        Read
        </button></td>
        <td>
        <button type="button" class="btn btn-warning" onclick="readAndUpdateBook(event, ${book.id});">
        Update
        </button></td>
        <td>
        <button type="button" class="btn btn-danger" onclick="onDeleteBook(event, ${book.id});">
        Delete
        </button></td>
        </tr>`
    })
    document.querySelector('.book-table').innerHTML = strHTML;
}


function onReadBook(bookId) {
    readBook(bookId);
}


function readAndUpdateBook(ev, bookId) {
    var newPrice = prompt('Update price to: ');
    updateBook(ev, bookId, newPrice)
    renderBooks();
}

function readAndAddNewBook() {
    var name = prompt('Book name?', 'war and peace');
    var price = prompt('Book price?');
    var newBook = createBook(name, price);
    gBooks.push(newBook);
    saveToStorage(BOOKS, gBooks)
    renderBooks();
}


function onDeleteBook(ev, bookId) {
    ev.stopPropagation();
    deleteBook(bookId);
    renderBooks();
}