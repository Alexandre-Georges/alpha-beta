const EMPTY = ' ';
const CROSS = 'X';
const CIRCLE = 'O';

const createBoard = () => [
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];

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

const getFirstEmptyCell = (board, x) => {
  let y = board.length - 1;
  while (board[y][x] !== EMPTY) {
    y--;
  }
  return y;
};

const isColumnFull = (board, x) => {
  return board[0][x] !== EMPTY;
};

const mutate = (board, symbol, x) => {
  const newBoard = duplicateBoard(board);
  let y = getFirstEmptyCell(board, x);
  newBoard[y][x] = symbol;
  return newBoard;
};

const opponent = (symbol) => symbol === CROSS ? CIRCLE : CROSS;

const getTopLeftToDownRightDiagonal = (board, x, y) => {
  let currentX = x;
  let currentY = y;
  const row = [];
  while (currentY < board.length && currentX < board[0].length) {
    row.push(board[currentY][currentX]);
    currentX++;
    currentY++;
  }
  return row;
};
const getTopRightToDownLeftDiagonal = (board, x, y) => {
  let currentX = x;
  let currentY = y;
  const row = [];
  while (currentY < board.length && currentX >= 0) {
    row.push(board[currentY][currentX]);
    currentX--;
    currentY++;
  }
  return row;
};

const getAllRows = (board) => {
  const rows = [];

  for (const rowIndex in board) {
    rows.push(board[rowIndex]);
  }

  for (const columnIndex in board[0]) {
    const column = [];
    for (const rowIndex in board) {
      column.push(board[rowIndex][columnIndex]);
    }
    rows.push(column);
  }

  for (let x = 0; x < 4; x++) {
    rows.push(getTopLeftToDownRightDiagonal(board, x, 0));
  }
  for (let y = 1; y < 3; y++) {
    rows.push(getTopLeftToDownRightDiagonal(board, 0, y));
  }

  for (let x = 6; x > 2; x--) {
    rows.push(getTopRightToDownLeftDiagonal(board, x, 0));
  }
  for (let y = 1; y < 3; y++) {
    rows.push(getTopRightToDownLeftDiagonal(board, 6, y));
  }

  const allRows = [];
  for (const rowIndex in rows) {
    const row = rows[rowIndex];
    if (row.length > 4) {
      for (let i = 0; i < row.length - 3; i++) {
        allRows.push(row.slice(i, i + 4));
      }
    } else {
      allRows.push(row);
    }
  }
  return allRows;
};
/*
console.log(getAllRows([
  ['0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6'],
  ['1,0', '1,1', '1,2', '1,3', '1,4', '1,5', '1,6'],
  ['2,0', '2,1', '2,2', '2,3', '2,4', '2,5', '2,6'],
  ['3,0', '3,1', '3,2', '3,3', '3,4', '3,5', '3,6'],
  ['4,0', '4,1', '4,2', '4,3', '4,4', '4,5', '4,6'],
  ['5,0', '5,1', '5,2', '5,3', '5,4', '5,5', '5,6'],
]));
*/
const has4InLine = (player, row) => {
  let count = 0;
  for (const index in row) {
    const cell = row[index];
    if (player === cell) {
      count++;
    } else {
      count = 0;
    }
    if (count === 4) {
      return true;
    }
  }
  return false;
};

const printBoard = (board) => {
  console.log('   1   2   3   4   5   6   7');
  console.log(' ╔═══╦═══╦═══╦═══╦═══╦═══╦═══╗');
  for (const y in board) {
    const row = board[y];
    let line = ` ║`;
    for (const x in row) {
      line += ` ${row[x]} ║`;
    }
    console.log(line);
    if (y < 5) {
      console.log(' ╠═══╬═══╬═══╬═══╬═══╬═══╬═══╣');
    }
  }
  console.log(' ╚═══╩═══╩═══╩═══╩═══╩═══╩═══╝');
};

const hasWon = (board, player) => {
  const rows = getAllRows(board);
  for (const index in rows) {
    const row = rows[index];
    if (has4InLine(player, row)) {
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
  getFirstEmptyCell,
  isColumnFull,
  mutate,
  isGameOver,
  printBoard,
  getAllRows,
};