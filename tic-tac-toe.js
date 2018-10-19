const EMPTY = ' ';
const CROSS = 'X';
const CIRCLE = 'O';

const createBoard = () => [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];

const duplicateBoard = (board) => {
  const newBoard = [];
  for (var y in board) {
    const row = board[y];
    const newRow = [];
    for (var x in row) {
      newRow.push(row[x]);
    }
    newBoard.push(newRow);
  }
  return newBoard;
};

const mutate = (board, symbol, x, y) => {
  const newBoard = duplicateBoard(board);
  newBoard[y][x] = symbol;
  return newBoard;
};

const opponent = (symbol) => symbol === CROSS ? CIRCLE : CROSS;

const getAllRows = (board) => {
  return [
    board[0],
    board[1],
    board[2],
    [ board[0][0], board[1][0], board[2][0] ],
    [ board[0][1], board[1][1], board[2][1] ],
    [ board[0][2], board[1][2], board[2][2] ],
    [ board[0][0], board[1][1], board[2][2] ],
    [ board[2][0], board[1][1], board[0][2] ],
  ];
};

const printBoard = (board) => {
  console.log('   a   b   c ');
  console.log(' ╔═══╦═══╦═══╗');
  for (const y in board) {
    const row = board[y];
    let line = `${y}║`;
    for (const x in row) {
      line += ` ${row[x]} ║`;
    }
    console.log(line);
    if (y < 2) {
      console.log(' ╠═══╬═══╬═══╣');
    }
  }
  console.log(' ╚═══╩═══╩═══╝');
};

const hasWon = (board, player) => {
  const rows = getAllRows(board);
  for (const index in rows) {
    const row = rows[index];
    if (row.every(cell => cell === player)) {
      return true;
    }
  }
  return false;
};

const isFull = (board) => {
  for (const index in board) {
    const row = board[index];
    if (row.find(cell => cell === EMPTY)) {
      return false;
    }
  }
  return true;
};

const isGameOver = (board) => hasWon(board, CIRCLE) || hasWon(board, CROSS) || isFull(board);

module.exports = {
  EMPTY,
  CROSS,
  CIRCLE,
  createBoard,
  opponent,
  mutate,
  isGameOver,
  printBoard,
  getAllRows,
};