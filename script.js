let board = [
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
function checkGuess(board, row, column, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(column / 3) + (i % 3);
    if (board[i][column] === k || board[row][i] === k || board[m][n] === k) {
      return false;
    }
  }
  return true;
}

function sudokuSolver(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] == ".") {
        for (let k = 1; k <= 9; k++) {
          if (checkGuess(data, i, j, k)) {
            data[i][j] = `${k}`;
            if (sudokuSolver(data)) {
              return true;
            } else {
              data[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}
console.log(sudokuSolver(board));
console.log(board);
