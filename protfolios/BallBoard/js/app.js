var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';

var gBoard;
var gGamerPos;

var gCreateBallInterval;
var gGlueInterval;

var gBallsColected = 0;
var gBallsCreated = 2;

var gElModal = document.querySelector('.modal');

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)
	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				if (j === 5 || i === 5) {
					cell.type = FLOOR;
				} else cell.type = WALL;
			}
			// Add created cell to The game board
			board[i][j] = cell;
		}
	}
	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;
	gCreateBallInterval = setInterval(getRendomBallPos, 3000)
	gGlueInterval = setInterval(getGlue, 5000);
	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];
			var cellClass = getClassName({ i: i, j: j })
			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';
			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';
			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}
			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	console.log('strHTML is:');
	console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	if ((i < 0 || i >= gBoard.length - 1) || (j < 0 || j >= gBoard[0].length - 1)) {
		i = goEdgeI(i);
		j = goEdgeJ(j);
		var targetCell = gBoard[i][j];
		movingPlayer(i, j, targetCell);
	}
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		movingPlayer(i, j, targetCell);
	} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);
	if (gBallsColected === gBallsCreated) {
		clearInterval(gCreateBallInterval);
		console.log(' game over');
		gElModal.style.display = 'block';
	}
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}
// Move the player by keyboard arrows
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;
	var elCell = document.querySelector(`.cell-${i}-${j}`)
	while (elCell.classList.contains('glue')) return;
	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function getGlue() {
	var posI = getRandIntInclusive(1, 8);
	var posJ = getRandIntInclusive(1, 10);
	if (posI === gGamerPos.i && posJ === gGamerPos.j) return;
	if (gBoard[posI][posJ] === BALL) return;
	var elCell = document.querySelector(`.cell-${posI}-${posJ}`);
	elCell.classList.add('glue');
	setTimeout(() => {
		elCell.classList.remove('glue');
	}, 3000)
}

function getRendomBallPos() {
	var posI = getRandIntInclusive(1, 8);
	var posJ = getRandIntInclusive(1, 10);
	if (posI === gGamerPos.i && posJ === gGamerPos.j) return;
	if (gBoard[posI][posJ] === BALL) return;
	gBoard[posI][posJ].gameElement = BALL;
	renderCell({ i: posI, j: posJ }, BALL_IMG);
	gBallsCreated++;
}

function ballCollected() {
	gBallsColected++;
	var audio = new Audio('sound.mp3')
	audio.play();
	var elBallsCount = document.getElementById('balls-count')
	elBallsCount.innerText = gBallsColected;
}

function goEdgeI(i) {
	//Arrow up
	if (i < 0) {
		i = gBoard.length - 1;
	}
	//Arrow down
	if (i > gBoard.length - 1) {
		i = 0;
	}
	return i;
}
function goEdgeJ(j) {
	//Arrow left
	if (j < 0) j = gBoard[0].length - 1;
	//Arrow right
	if (j > gBoard[0].length - 1) j = 0;
	return j;
}

function movingPlayer(i, j, targetCell) {
	if (targetCell.gameElement === BALL) {
		gBallsColected++;
		var elBallsCount = document.getElementById('balls-count')
		elBallsCount.innerText = gBallsColected;
	}
	// MOVING from current position
	// Model:
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
	// Dom:
	renderCell(gGamerPos, '');
	// MOVING to selected position
	// Model:
	gGamerPos.i = i;
	gGamerPos.j = j;
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	// DOM:
	renderCell(gGamerPos, GAMER_IMG);
} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);


function restart() {
	gBallsColected = 0;
	gBallsCreated = 0;
	gElModal.style.display = 'none';
	initGame();
}



