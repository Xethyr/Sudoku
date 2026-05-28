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

function puzzleSolver(board) {
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (board[i][j] === ".") {
        for (k = 1; k < 10; k++) {
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

console.log(puzzleSolver(board), board);
