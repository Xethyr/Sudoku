const puzzleContainer = document.getElementById("puzzle");
const controlsContainer = document.getElementById("controls");
let errorCount = 0;
const errorText = document.getElementById("errors");
let blankBoard = [
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
];
let newNewBoard = blankBoard;

let newBoard = [
  [".", "9", ".", ".", "4", "2", "1", "3", "6"],
  [".", ".", ".", "9", "6", ".", "4", "8", "5"],
  [".", ".", ".", "5", "8", "1", ".", ".", "."],
  [".", ".", "4", ".", ".", ".", ".", ".", "."],
  ["5", "1", "7", "2", ".", ".", "9", ".", "."],
  ["6", ".", "2", ".", ".", ".", "3", "7", "."],
  ["1", ".", ".", "8", ".", "4", ".", "2", "."],
  ["7", ".", "6", ".", ".", ".", "8", "1", "."],
  ["3", ".", ".", ".", "9", ".", ".", ".", "."],
];

let solvedBoard = newBoard;

function checkGuess(board, row, column, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(column / 3) + (i % 3);
    if (board[i][column] == k || board[row][i] == k || board[m][n] == k) {
      return false;
    }
  }
  return true;
}

function puzzleSolver(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == ".") {
        for (let k = 1; k <= 9; k++) {
          if (checkGuess(board, i, j, k)) {
            board[i][j] = `${k}`;
            if (puzzleSolver(board)) {
              return true;
            } else {
              board[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function setBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = puzzleContainer.appendChild(document.createElement("div"));
      cell.classList.add("cell");
      cell.setAttribute("id", `${i}-${j}`);
      if (board[i][j] !== ".") {
        cell.innerText = board[i][j];
      }
      if (j === 2 || j === 5) {
        cell.classList.add("vertical-border");
      }
      if (i === 2 || i === 5) {
        cell.classList.add("horizontal-border");
      }
    }
  }
  for (let i = 1; i < 10; i++) {
    const numberButton = controlsContainer.appendChild(
      document.createElement("div"),
    );
    numberButton.classList.add("number");
    numberButton.setAttribute("id", `${i}`);
    numberButton.innerText = `${i}`;
  }
}

setBoard(newBoard);
puzzleSolver(solvedBoard);

function compareToSolution() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (
        document.getElementById(`${i}-${j}`).innerText !== solvedBoard[i][j]
      ) {
        document.getElementById(`${i}-${j}`).innerText = "";
      }
    }
  }
}

function compareGuess(e) {
  const guessPosition = e.target.id.split("-");
  const row = parseInt(guessPosition[0]);
  const col = parseInt(guessPosition[1]);
  if (e.target.innerText !== solvedBoard[row][col]) {
    e.target.innerText = "";
    errorCount += 1;
    errorText.innerText = "Error Count: " + errorCount;
  }
}

window.addEventListener("click", (e) => {
  if (e.target.className === "number") {
    const numberButtons = document.querySelectorAll(".number");
    numberButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    const numberSelection = document.getElementById(`${e.target.id}`);
    numberSelection.classList.add("selected");
  }
  if (e.target.classList.contains("cell") && e.target.innerText === "") {
    const selectedNumberBox = document.querySelector(".selected");
    const selectedNumber = selectedNumberBox.getAttribute("id");
    e.target.innerText = selectedNumber;
    compareGuess(e);
  }
});

function genRandomBoard() {
  const ranInt = Math.floor(Math.random()) * 10;
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {}
  }
}
