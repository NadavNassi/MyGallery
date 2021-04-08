'use strict'



function init() {
    gBoard = getMat(gLevel.SIZE)
    printMat(gBoard, '.board')
    if (gLevel.SIZE === 4) renderLife(2);
    else renderLife(3)
    renderHighScore()
    renderHints()
    renderSafeButton();
}



function startGame(elCell, i, j) {
    gElSmiley.innerHTML = `<i class=smiley onclick="restart()">${gNormal}</i>`
    gBoard = getMat(gLevel.SIZE, i, j)
    printMat(gBoard, '.board')
    var minesPosition = [];
    minesPosition = setMinesPosition(i, j)
    gGame.isOn = true;
    setMines(gBoard, minesPosition)
    cellClicked(elCell, i, j)
    startTime();
}


function startTime() {
    var sTime = Date.now()
    var elTimeTd = document.querySelector('.time');
    gTimeInterval = setInterval(() => {
        var currTime = Date.now()
        var passedTime = new Date(currTime - sTime)
        var secs = passedTime.getSeconds()
        var minutes = passedTime.getMinutes()
        var time = minutes * 60 + secs
        gGame.secsPassed = minutes * 60 + secs;
        elTimeTd.innerText = time
    }, 1000)
}

function renderLife(size) {
    var elLife = document.querySelector('.life');
    var str = '';
    gLifes = []
    for (var i = 0; i < size; i++) {
        gLifes.push(gLife)
        str += gLife;
        str += '|'
    }
    elLife.innerText = str
}

function renderSafeButton() {
    var elSafe = document.querySelector('.safe');
    elSafe.innerHTML = `<h3>Click the button for no conseqences</h3><button class="btn-safe" onclick="useSafeClick()">SAFE CLICKS LEFT: ${gSafe}</button>`
}


function getSize(size, minesAmount) {
    gLevel.SIZE = size;
    gLevel.MINES = minesAmount;
    init();
}


function checkGameOver() {
    if (gGame.shownCount === gLevel.SIZE * gLevel.SIZE) {
        gGame.isWin = true
        gameOver()
    };
    if (gLevel.MINES === gGame.markedCount) {
        gGame.isWin = true
        gameOver()
    };
    if (!gLifes.length) {
        gGame.isWin = false
        gameOver()
    };
}

function gameOver() {
    checkIfNewHighScore()
    renderHighScore()
    clearInterval(gTimeInterval);
    gGame.isOn = false;
    gElSmiley.innerText = (gGame.isWin) ? gWin : gLose;
}

function restart() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isWin: false
    }
    var elTimeTd = document.querySelector('.time');
    elTimeTd.innerText = '00'
    var elFlags = document.querySelector('.marked')
    elFlags.innerText = '00'
    gElSmiley.innerText = gNormal;
    gBoard = [];
    gLifes = []
    init();
}

