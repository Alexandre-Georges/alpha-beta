const {
  EMPTY,
  CROSS,
  CIRCLE,
  opponent,
  getAllRows,
  mutate,
} = require('./tic-tac-toe');

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

  if (opponentSymbols === 3) {
    return -1000;
  }
  if (opponentSymbols === 2 && emptySymbols === 1) {
    return -100;
  }
  if (opponentSymbols === 1 && emptySymbols === 2) {
    return -10;
  }
  if (playerSymbols === 3) {
    return 1000;
  }
  if (playerSymbols === 2 && emptySymbols === 1) {
    return 100;
  }
  if (playerSymbols === 1 && emptySymbols === 2) {
    return 10;
  }
  return 0;
};

const computeBoardScore = (board, player) => {
  return getAllRows(board).reduce((score, row) => score + rowScore(row, player), 0);
};

const createNode = (state, player) => {
  return {
    state,
    player,
    children: [],
  };
};

const findNextNodes = (node) => {
  const nextNodes = [];
  for (const y in node.state) {
    const row = node.state[y];
    for (const x in row) {
      const square = row[x];
      if (square === EMPTY) {
        const nextPlayer = node.player === CROSS ? CIRCLE : CROSS;
        const state = mutate(node.state, nextPlayer, x, y);
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
  const depth = 1;

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
