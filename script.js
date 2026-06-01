const puzzleContainer = document.getElementById("puzzle");
const controlsContainer = document.getElementById("controls");
let errorCount = 0;
const errorText = document.getElementById("errors");
const newPuzzleBtn = document.getElementById("new-puzzle");
const solvePuzzleBtn = document.getElementById("solve-puzzle");
const clearBoardBtn = document.getElementById("clear-board");

const blankBoard = [
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

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

let newNewBoard = cloneBoard(blankBoard);

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

let solvedBoard = cloneBoard(newBoard);

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
  puzzleContainer.replaceChildren();
  controlsContainer.replaceChildren();
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

function compareBoards(arrA, arrB) {
  if (arrA.length !== arrB.length) {
    return false;
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arrA[i][j] !== arrB[i][j]) {
        return false;
      }
    }
  }
  return true;
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
    if (!compareBoards(solvedBoard, blankBoard)) {
      compareGuess(e);
    }
  }
});

function genRandomBoard() {
  newNewBoard = cloneBoard(blankBoard);

  // Seed with 25 random, valid numbers to guarantee variety and a high solvability rate
  let placed = 0;
  while (placed < 25) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const val = Math.floor(Math.random() * 9) + 1;

    if (newNewBoard[row][col] === ".") {
      if (checkGuess(newNewBoard, row, col, val)) {
        newNewBoard[row][col] = `${val}`;
        placed++;
      }
    }
  }
  if (puzzleSolver(newNewBoard)) {
    console.log("solvable");
    return true;
  } else {
    console.log("trying again");
    return genRandomBoard();
  }
}

function setNewBoard() {
  errorCount = 0;
  errorText.innerText = "Error Count: " + errorCount;

  genRandomBoard();

  // Save the fully solved board to solvedBoard before digging holes
  solvedBoard = cloneBoard(newNewBoard);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const fiftyFifty = Math.floor(Math.random() * 2);
      if (fiftyFifty === 1) {
        newNewBoard[i][j] = ".";
      }
    }
  }
  setBoard(newNewBoard);
}

function solveUserBoard() {
  let userBoard = cloneBoard(blankBoard);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (document.getElementById(`${i}-${j}`).innerText === "") {
        userBoard[i][j] = ".";
      } else {
        userBoard[i][j] = document.getElementById(`${i}-${j}`).innerText;
      }
    }
  }
  console.log(userBoard);
  puzzleSolver(userBoard);
  setBoard(userBoard);
}

newPuzzleBtn.addEventListener("click", setNewBoard);

solvePuzzleBtn.addEventListener("click", () => {
  if (compareBoards(solvedBoard, blankBoard)) {
    solveUserBoard();
  } else {
    setBoard(solvedBoard);
  }
});

clearBoardBtn.addEventListener("click", () => {
  setBoard(blankBoard);
  solvedBoard = cloneBoard(blankBoard);
});
