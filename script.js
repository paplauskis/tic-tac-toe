const grid = document.getElementsByClassName('grid')[0];

const createGameBoard = (() => {
  let gameBoard = ['X','O','X','O','X','O','X','O','X'];

  const getGameBoard = () => gameBoard;
  const updateBoard = (index, value) => gameBoard[index] = value;
  const resetBoard = () => gameBoard = ['','','','','','','','',''];

  return { getGameBoard, updateBoard, resetBoard };
})();

const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const startGame = () => `${name} starts the game!`;
  return { getName, getMarker, startGame };
}
// const koste = player('koste', 'x')
function appendGameBoard() {
  const gameBoard = createGameBoard.getGameBoard();

  gameBoard.forEach(marker => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = marker;
    grid.appendChild(cell);
    console.log(cell);
  })
}
appendGameBoard();