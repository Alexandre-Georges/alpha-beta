const readline = require('readline');

const { firstMove, recordPlayerTurn } = require('./connect4-state');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const playerTurn = () => {
  rl.question('Position? ', (answer) => {
    let x = -1;
    if (answer.endsWith('1')) {
      x = 0;
    } else if (answer.endsWith('2')) {
      x = 1;
    } else if (answer.endsWith('3')) {
      x = 2;
    } else if (answer.endsWith('4')) {
      x = 3;
    } else if (answer.endsWith('5')) {
      x = 4;
    } else if (answer.endsWith('6')) {
      x = 5;
    } else if (answer.endsWith('7')) {
      x = 6;
    }
    recordPlayerTurn(x);
  });
};

const finishGame = () => {
  console.log('Game over');
  rl.close();
  process.exit(0);
};

firstMove(playerTurn, finishGame);