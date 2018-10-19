const readline = require('readline');

const { firstMove, recordPlayerTurn } = require('./tic-tac-toe-state');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const playerTurn = () => {
  rl.question('Position? ', (answer) => {
    let x = -1;
    if (answer.startsWith('a')) {
      x = 0;
    } else if (answer.startsWith('b')) {
      x = 1;
    } else if (answer.startsWith('c')) {
      x = 2;
    }
    let y = -1;
    if (answer.endsWith('0')) {
      y = 0;
    } else if (answer.endsWith('1')) {
      y = 1;
    } else if (answer.endsWith('2')) {
      y = 2;
    }
    recordPlayerTurn(x, y);
  });
};

const finishGame = () => {
  console.log('Game over');
  rl.close();
  process.exit(0);
};

firstMove(playerTurn, finishGame);