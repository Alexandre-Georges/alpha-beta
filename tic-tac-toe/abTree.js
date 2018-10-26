const buildABTree = (heuristic, depth, node, isPlayer) => {
  alphabeta(heuristic, node, depth, -Number.MAX_VALUE, Number.MAX_VALUE, isPlayer);
};

const alphabeta = (heuristic, node, depth, alpha, beta, isPlayer) => {
  if (depth === 0 || node.children.length === 0) {
    node.value = heuristic(node);
    return node.value;
  }
  if (isPlayer) {
    let value = -Number.MAX_VALUE;
    for (const index in node.children) {
      const child = node.children[index];
      value = Math.max(value, alphabeta(heuristic, child, depth - 1, alpha, beta, false));
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        break;
      }
    }
    node.value = value;
    return node.value;
  } else {
    let value = Number.MAX_VALUE;
    for (const index in node.children) {
      const child = node.children[index];
      value = Math.min(value, alphabeta(heuristic, child, depth - 1, alpha, beta, true));
      beta = Math.min(beta, value);
      if (alpha >= beta) {
        break;
      }
    }
    node.value = value;
    return node.value;
  }
};

module.exports = {
  buildABTree,
};