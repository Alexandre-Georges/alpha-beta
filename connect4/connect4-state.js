const {
  CROSS,
  CIRCLE,
  createBoard,
  mutate,
  printBoard,
  isGameOver,
} = require('./connect4');

const { findNextMove } = require('./connect4-ai');

let board = null;
let currentPlayer = null;
let isPlayerTurn = null;
let playerTurn = null;
let finishGame = null;

const resetGame = () => {
  board = createBoard();
  currentPlayer = CROSS;
  isPlayerTurn = Math.random() > 0.5;
};

const recordPlayerTurn = (x) => {
  board = mutate(board, currentPlayer, x);

  checkGameStatus();

  currentPlayer = currentPlayer === CROSS ? CIRCLE : CROSS;
  isPlayerTurn = !isPlayerTurn;
  nextStep();
};

const computerTurn = () => {
  board = findNextMove(board, currentPlayer === CROSS ? CIRCLE : CROSS);
  checkGameStatus();
  currentPlayer = currentPlayer === CROSS ? CIRCLE : CROSS;
  isPlayerTurn = !isPlayerTurn;
  nextStep();
};

const checkGameStatus = () => {
  if (isGameOver(board)) {
    printBoard(board);
    finishGame();
  }
};

const nextStep = () => {
  printBoard(board);

  if (isPlayerTurn) {
    playerTurn();
  } else {
    computerTurn();
  }

};

module.exports = {
  firstMove: (playerTurnP, finishGameP) => {
    playerTurn = playerTurnP;
    finishGame = finishGameP;
    resetGame();
    nextStep();
  },
  recordPlayerTurn,
};
