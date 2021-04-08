'use strict'


function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    var val = JSON.parse(str);
    return val;
}

function saveToStorage(key, val) {
    var str = JSON.stringify(val)
    localStorage.setItem(key, str)
}

function removeFromStorage(key) {
    localStorage.removeItem(key)
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}
