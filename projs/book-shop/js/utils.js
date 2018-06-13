function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function getBookIdxById(id) {
    for (var i = 0; i < gBooks.length; i++) {
        var book = gBooks[i];
        if (book.id === id) return i;
    }
    return -1;
}


function getRandomInt() {
    return Math.floor(Math.random() * 25)
}