const grid = document.querySelector('.grid');
const switchTurnDiv = document.querySelector('.switch-turn');
const restartGameButton = document.querySelector('.restart-game');
const playerScoreboard = document.querySelector('.player-scores');
const cellsNodeList = document.querySelectorAll('.cell');
const cellsNodeListArray = [...cellsNodeList];
let playerOneScore = 0;
let playerTwoScore = 0;
const divPlayerOneScore = document.createElement('div');
divPlayerOneScore.textContent = `X score: ${playerOneScore}`;
playerScoreboard.appendChild(divPlayerOneScore);
const divPlayerTwoScore = document.createElement('div');
divPlayerTwoScore.textContent = `O score: ${playerTwoScore}`;
playerScoreboard.appendChild(divPlayerTwoScore);
const clickSound = new Audio('assets/click-sound.mp3');
clickSound.volume = 0.05;
const gameEndSound = new Audio('assets/game-end.mp3');
gameEndSound.volume = 0.1;

const GameBoard = (() => {
  let gameBoard = ['','','','','','','','',''];

  const getGameBoard = () => gameBoard;
  const updateBoard = (index, marker) => gameBoard[index] = marker;
  const resetBoard = () => gameBoard.fill('');

const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const turn = () => `${name}'s turn!`;
  return { getName, getMarker, turn };
}

const playerOne = player('X', '❌');
const playerTwo = player('O', '⭕️');
let activePlayer = playerOne;

const switchPlayer = () => {
  activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  switchTurnDiv.textContent = activePlayer.turn();
}

const getMarker = (e) => {
  const index = e.target.dataset.value;
  const marker = activePlayer.getMarker();
  if (GameBoard.getGameBoard()[index] === '') {
    GameBoard.updateBoard(index, marker);
    switchPlayer();
    appendMarker();
  } else {
    switchTurnDiv.textContent = `${activePlayer.getName()}, you can't mark a marked spot!`;
  }
}

const appendMarker = () => {
  let index = 0;
  for (let marker of GameBoard.getGameBoard()) {
    cellsNodeListArray[index].textContent = marker;
    index++;
  }
  clickSound.play();
  checkWinner();
}

const clearBoard = () => {
  GameBoard.resetBoard();
  appendMarker();
  activePlayer = playerOne;
  switchTurnDiv.textContent = activePlayer.turn();
  switchTurnDiv.classList.remove('winner-div');
}

const checkWinner = () => {
  const b = GameBoard.getGameBoard()
  if (
      b[0] == '❌' && b[1] == '❌' && b[2] == '❌' || b[3] == '❌' && b[4] == '❌' && b[5] == '❌' || 
      b[6] == '❌' && b[7] == '❌' && b[8] == '❌' || b[0] == '❌' && b[3] == '❌' && b[6] == '❌' || 
      b[1] == '❌' && b[4] == '❌' && b[7] == '❌' || b[2] == '❌' && b[5] == '❌' && b[8] == '❌' ||
      b[0] == '❌' && b[4] == '❌' && b[8] == '❌' || b[2] == '❌' && b[4] == '❌' && b[6] == '❌' ) 
    {
      switchTurnDiv.classList.add('winner-div');
      switchTurnDiv.textContent = `${playerOne.getName()} wins!`;
      playerOneScore++;
      divPlayerOneScore.textContent = `X score: ${playerOneScore}`;
      gameEndSound.play();
      setTimeout(clearBoard, 5000);
    } else if (
      b[0] == '⭕️' && b[1] == '⭕️' && b[2] == '⭕️' || b[3] == '⭕️' && b[4] == '⭕️' && b[5] == '⭕️' || 
      b[6] == '⭕️' && b[7] == '⭕️' && b[8] == '⭕️' || b[0] == '⭕️' && b[3] == '⭕️' && b[6] == '⭕️' || 
      b[1] == '⭕️' && b[4] == '⭕️' && b[7] == '⭕️' || b[2] == '⭕️' && b[5] == '⭕️' && b[8] == '⭕️' ||
      b[0] == '⭕️' && b[4] == '⭕️' && b[8] == '⭕️' || b[2] == '⭕️' && b[4] == '⭕️' && b[6] == '⭕️' ) 
    {
      switchTurnDiv.classList.add('winner-div');
      switchTurnDiv.textContent = `${playerTwo.getName()} wins!`;
      playerTwoScore++;
      divPlayerTwoScore.textContent = `O score: ${playerTwoScore}`;
      gameEndSound.play();
      setTimeout(clearBoard, 5000);
    } else if (
      b[0] != '' && b[1] != '' && b[2] != '' && 
      b[3] != '' && b[4] != '' && b[5] != '' && 
      b[6] != '' && b[7] != '' && b[8] != '' ) 
    {
      switchTurnDiv.classList.add('winner-div');
      switchTurnDiv.textContent = `It is a draw!`;
      setTimeout(clearBoard, 3000);
    }
}

cellsNodeList.forEach(cell => {
  cell.addEventListener('click', getMarker);
})

restartGameButton.addEventListener('click', clearBoard);

return { 
  getGameBoard, 
  updateBoard, 
  resetBoard
};
})();