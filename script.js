const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
      statusText.textContent = Player ${currentPlayer} wins!;
      gameActive = false;
    } else if (!gameState.includes("")) {
      statusText.textContent = "It's a tie!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = Player ${currentPlayer}'s turn;
    }
  }
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(i => gameState[i] === currentPlayer);
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = Player ${currentPlayer}'s turn;
  cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);