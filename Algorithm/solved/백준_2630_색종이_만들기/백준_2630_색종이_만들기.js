const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");
const n = input[0];
const board = input.slice(1).map((e) => e.split(" ").map(Number));

let whiteCnt = 0;
let blueCnt = 0;

function check(half, r, c) {
  const type = board[r][c];
  for (let i = r; i < r + half; i++) {
    for (let j = c; j < c + half; j++) {
      if (board[i][j] !== type) {
        return false;
      }
    }
  }

  return true;
}

function dfs(n, r, c) {
  if (check(n, r, c) || n === 1) {
    board[r][c] === 0 ? whiteCnt++ : blueCnt++;
    return;
  }

  const half = n / 2;
  dfs(half, r, c);
  dfs(half, r, c + half);
  dfs(half, r + half, c);
  dfs(half, r + half, c + half);
}

dfs(n, 0, 0);

console.log(whiteCnt);
console.log(blueCnt);
