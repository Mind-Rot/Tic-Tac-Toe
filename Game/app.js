const gameState = {
  players: ['x', 'o'],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
};

let currentPlayer = gameState.players[0];
let moves = 0;
let player1Score = 0;
let player2Score = 0;

const board = document.querySelector('.board');
const status = document.querySelector('#status');
const resetButton = document.querySelector('#reset');
const player1ScoreDisplay = document.querySelector('#player1-score');
const player2ScoreDisplay = document.querySelector('#player2-score');
const togglePlayer2Btn = document.getElementById('toggle-player2');
togglePlayer2Btn.addEventListener('click', togglePlayer2);


let isComputerMode = false;

function togglePlayer2() {
  if (isComputerMode) {
    togglePlayer2Btn.textContent = 'Switch to Computer';
    gameState.players[1] = 'o';
    board.classList.remove('disabled');
  } else {
    togglePlayer2Btn.textContent = 'Switch to Person';
    gameState.players[1] = 'computer';
    board.classList.add('disabled');
  }
  isComputerMode = !isComputerMode;
}

function clickHandler(e) {
	if (e.target.classList.contains('square') && !e.target.textContent) {
		const squareId = parseInt(e.target.id);
		const row = Math.floor(squareId / 3);
		const col = squareId % 3;
		gameState.board[row][col] = currentPlayer;
		e.target.textContent = currentPlayer;
		moves++;
		if (checkWin(row, col)) {
			status.textContent = `${currentPlayer} wins!`;
			if (currentPlayer === gameState.players[0]) {
				player1Score++;
				player1ScoreDisplay.textContent = player1Score;
			} else {
				player2Score++;
				player2ScoreDisplay.textContent = player2Score;
			}
			board.classList.add('game-over');
			board.removeEventListener('click', clickHandler);
		} else if (moves === 9) {
			status.textContent = 'Tie game';
			board.classList.add('game-over');
			board.removeEventListener('click', clickHandler);
		} else {
			currentPlayer = gameState.players[moves % 2];
			status.textContent = `${currentPlayer}'s turn`;
		}
	}
}

function computerMove() {
  let squareId;
  do {
    squareId = Math.floor(Math.random() * 9);
  } while (document.getElementById(squareId).textContent);

  const row = Math.floor(squareId / 3);
  const col = squareId % 3;
  gameState.board[row][col] = currentPlayer;
  document.getElementById(squareId).textContent = currentPlayer;
  moves++;

  if (checkWin(row, col)) {
    status.textContent = `${currentPlayer} wins!`;
    if (currentPlayer === gameState.players[0]) {
      player1Score++;
      player1ScoreDisplay.textContent = player1Score;
    } else {
      player2Score++;
      player2ScoreDisplay.textContent = player2Score;
    }
    board.classList.add('game-over');
    board.removeEventListener('click', clickHandler);
  } else if (moves === 9) {
    status.textContent = 'Tie game';
    board.classList.add('game-over');
    board.removeEventListener('click', clickHandler);
  } else {
    currentPlayer = gameState.players[moves % 2];
    if (currentPlayer === gameState.players[1]) {
      if (gameState.players[1] === 'computer') {
        setTimeout(computerMove, 1000); 
      } else {
        board.classList.remove('disabled');
        status.textContent = `${currentPlayer}'s turn`;
      }
    } else {
      board.classList.remove('disabled');
      status.textContent = `${currentPlayer}'s turn`;
    }
  }
}

board.addEventListener('click', clickHandler);

function checkWin(row, col) {
	const player = gameState.board[row][col];
	if (gameState.board[row].every(val => val === player)) {
		return true;
	}
	if (gameState.board.every(row => row[col] === player)) {
		return true;
	}
	if (row === col && gameState.board.every((row, index) => row[index] === player)) {
		return true;
	}
	if (row + col === 2 && gameState.board.every((row, index) => row[2 - index] === player)) {
		return true;
	}
	return false;
}

resetButton.addEventListener('click', function() {
	gameState.board = [
	    [null, null, null],
	    [null, null, null],
	    [null, null, null]
  	];
  	currentPlayer = gameState.players[0];
  	moves = 0;
  	
  	const squares = document.querySelectorAll('.square');
  	squares.forEach(square => {
  		square.textContent = '';
  	});
  	status.textContent = `${currentPlayer}'s turn`;
  	board.classList.remove('game-over');
  	board.addEventListener('click', clickHandler);
});