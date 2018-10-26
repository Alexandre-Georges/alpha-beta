const {
  EMPTY,
  CROSS,
  CIRCLE,
  opponent,
  getAllRows,
  mutate,
  getFirstEmptyCell,
  isColumnFull,
} = require('./connect4');

const { buildABTree } = require('./abTree');

const rowScore = (row, player) => {
  const symbols = {};
  symbols[EMPTY] = 0;
  symbols[CROSS] = 0;
  symbols[CIRCLE] = 0;
  for (const index in row) {
    symbols[row[index]] += 1;
  }

  const opponentSymbols = symbols[opponent(player)];
  const emptySymbols = symbols[EMPTY];
  const playerSymbols = symbols[player];

  if (opponentSymbols === 4) {
    //console.log(`${row} -100000`);
    return -100000000;
  }
  if (opponentSymbols === 3 && emptySymbols === 1) {
    //console.log(`${row} -1000`);
    return -1000000;
  }
  if (opponentSymbols === 2 && emptySymbols === 2) {
    //console.log(`${row} -1`);
    return -10;
  }
  if (playerSymbols === 4) {
    //console.log(`${row} 100000`);
    return 100000;
  }
  if (playerSymbols === 3 && emptySymbols === 1) {
    //console.log(`${row} 1000`);
    return 1000;
  }
  if (playerSymbols === 2 && emptySymbols === 2) {
    //console.log(`${row} 1`);
    return 1;
  }

  return 0;
};

const computeBoardScore = (board, player) => {
  return getAllRows(board).reduce((score, row) => score + rowScore(row, player), 0);
};
/*
console.log(computeBoardScore([
  [ "O",  "X",  " ",  "O",  "O",  " ",  "O" ],
  [ "X",  "O",  " ",  "O",  "X",  " ",  "X" ],
  [ "X",  "X",  " ",  "X",  "O",  " ",  "X" ],
  [ "O",  "O",  " ",  "O",  "X",  " ",  "O" ],
  [ "X",  "X",  " ",  "X",  "O",  "O",  "O" ],
  [ "X",  "O",  " ",  "X",  "X",  "X",  "O" ]
], 'O'));

console.log(computeBoardScore([
  ["O", "X", " ", "O", "O", " ", "O"],
  ["X", "O", " ", "O", "X", " ", "X"],
  ["X", "X", " ", "X", "O", " ", "X"],
  ["O", "O", " ", "O", "X", " ", "O"],
  ["X", "X", " ", "X", "O", " ", "O"],
  ["X", "O", "O", "X", "X", "X", "O"]
], 'O'));
*/
const createNode = (state, player) => {
  return {
    state,
    player,
    children: [],
  };
};

const findNextNodes = (node) => {
  const nextNodes = [];
  for (const x in node.state[0]) {
    if (!isColumnFull(node.state, x)) {
      let y = getFirstEmptyCell(node.state, x);
      const square = node.state[y][x];
      if (square === EMPTY) {
        const nextPlayer = node.player === CROSS ? CIRCLE : CROSS;
        const state = mutate(node.state, nextPlayer, x);
        nextNodes.push(createNode(state, nextPlayer));
      }
    }
  }
  return nextNodes;
};

const buildNode = (depth, node) => {
  node.children = findNextNodes(node);
  if (depth > 1) {
    for (const childrenIndex in node.children) {
      buildNode(depth - 1, node.children[childrenIndex]);
    }
  }
};

const buildTree = (state, player) => {
  const depth = 3;

  const root = createNode(state, player);
  buildNode(depth, root);

  buildABTree(
    (node) => { return computeBoardScore(node.state, node.player); },
    depth,
    root,
    true,
  );
  return root;
};

const findNextMove = (state, player) => {
  const tree = buildTree(state, player);
  //console.log(JSON.stringify(tree, null, 2));
  const value = tree.value;

  const bestChildren = [];
  for (const childrenIndex in tree.children) {
    const child = tree.children[childrenIndex];
    if (child.value === value) {
      bestChildren.push(child);
    }
  }
  if (bestChildren.length > 0) {
    return bestChildren[Math.floor(Math.random() * bestChildren.length)].state;
  }
  return null;
};

module.exports = { findNextMove };
