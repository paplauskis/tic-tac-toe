const grid = document.querySelector('.grid');
const switchTurnDiv = document.querySelector('.switch-turn');
const restartGameButton = document.querySelector('.restart-game');
const cellsNodeList = document.querySelectorAll('.cell');
const cellsNodeListArray = [...cellsNodeList];

const GameBoard = (() => {
  let gameBoard = ['','','','','','','','',''];

  const getGameBoard = () => gameBoard;
  const updateBoard = (index, marker) => gameBoard[index] = marker;
  const resetBoard = () => gameBoard.fill(''); /*= ['','','','','','','','',''];*/

  return { getGameBoard, updateBoard, resetBoard };
})();

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
  GameBoard.updateBoard(index, marker);
  appendMarker();
  switchPlayer();
}

const appendMarker = () => {
  let index = 0;
    for(let marker of GameBoard.getGameBoard()) {
      cellsNodeListArray[index].textContent = marker;
      index++;
  }
}

const clearBoard = () => {
  GameBoard.resetBoard();
  appendMarker();
  activePlayer = playerOne;
  switchTurnDiv.textContent = activePlayer.turn();
}



cellsNodeList.forEach(cell => {
  cell.addEventListener('click', getMarker);
})

restartGameButton.addEventListener('click', clearBoard);