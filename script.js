const grid = document.querySelector('.grid');
const cellsNodeList = document.querySelectorAll('.cell');
const cellsNodeListArray = [...cellsNodeList];

const GameBoard = (() => {
  let gameBoard = ['','','','','','','','',''];

  const getGameBoard = () => gameBoard;
  const updateBoard = (index, marker) => gameBoard[index] = marker;
  const resetBoard = () => gameBoard = ['','','','','','','','',''];

  return { getGameBoard, updateBoard, resetBoard };
})();

const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const startGame = () => `${name} starts the game!`;
  return { getName, getMarker, startGame };
}
// const koste = player('koste', 'X')
// const eva = player('eva', 'O')

const appendMarker = () => {
  let index = 0;
  for(let marker of GameBoard.getGameBoard()) {
    cellsNodeListArray[index].textContent = marker;
    index++;
  }
}

const addMarker = (e) => {
  const index = e.target.dataset.value;
  const marker = 'X';
  GameBoard.updateBoard(index, marker);
  appendMarker();
}

cellsNodeList.forEach(cell => {
  cell.addEventListener('click', addMarker);
})
