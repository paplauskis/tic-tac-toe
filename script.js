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
