let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.game-cell');
const resetButton = document.getElementById('reset');

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));

  if (gameState[clickedCellIndex] !== "" || checkWinner()) {
    return;
  }

  // Add the new animation class
  clickedCell.classList.add('animate-zoom');

  // Wait for the animation to finish before showing X or O
  setTimeout(() => {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.remove('animate-zoom'); // Remove animation class after use

    if (checkWinner()) {
      statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
    } else if (gameState.includes("")) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
    } else {
      statusDisplay.innerHTML = `It's a tie!`;
    }
  }, 500); // Time to match the animation duration
}



function checkWinner() {
  let winner = false;
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      winner = true;
      break;
    }
  }
  return winner;
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.innerHTML = "";
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Initial status display
statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
