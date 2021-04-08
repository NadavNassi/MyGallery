'use strict'

var gProjects;
var STORAGE_KEY = 'projectsDB'
var dumyProjects = [
    {
        name: 'MineSweeper',
        intro: 'The old classic game in a new version',
        describe: 'In this version of the game, you have extra lifes, hibts and more!',
        img: '01',
        url: 'protfolios/mineSweeper/index.html',
        category: 'Games, Matrix'
    },
    {
        name: 'BallBoard',
        intro: 'Chase the ball until you get them all',
        describe: 'Practicing matrix, loops and more to make this game',
        img: '02',
        url: 'protfolios/BallBoard/index.html',
        category: 'Graphic Design'
    },
    {
        name: 'Book Store',
        intro: 'Practicing localstore',
        describe: 'In this version of the game, you have extra lifes, hibts and more!',
        img: '03',
        url: 'protfolios/bookStore/index.html',
        category: 'localstore, CRUD'
    }
];
_createProjects()


function getProjects() {
    return gProjects;
}

function _createProjects() {
    var projects = loadFromStorage();
    if (!projects || projects.length === 0) {
        var projects = dumyProjects.map((project) => {
            return _creatProject(project)
        })
    }
    gProjects = projects;
    _saveProjectsToStorage();
}


function _creatProject(project) {
    var date = new Date(Date.now());
    var month = date.getMonth() + 1;
    var year = date.getFullYear()
    var project = {
        id: _makeId(),
        name: project.name,
        intro: project.intro,
        describe: project.describe,
        img: project.img,
        publishedAt: `${month} / ${year}`,
        url: project.url,
        category: project.category
    }
    return project;
}

function getProjectById(projId) {
    return gProjects.find(p => p.id === projId)
}

function _saveProjectsToStorage() {
    saveToStorage(STORAGE_KEY, gProjects);
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

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}