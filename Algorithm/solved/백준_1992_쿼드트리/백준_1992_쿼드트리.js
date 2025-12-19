const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const board = input.slice(1).map((e) => e.split("").map(Number));

let ans = "";
function check(half, r, c) {
  const type = board[r][c];
  for (let i = r; i < r + half; i++) {
    for (let j = c; j < c + half; j++) {
      if (type !== board[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function quadTree(half, r, c) {
  if (half === 1 || check(half, r, c)) {
    ans += board[r][c].toString();
    return;
  }

  ans += "(";

  half = Math.floor(half / 2);
  quadTree(half, r, c);
  quadTree(half, r, c + half);
  quadTree(half, r + half, c);
  quadTree(half, r + half, c + half);

  ans += ")";
}

function solution() {
  quadTree(n, 0, 0);
  console.log(ans);
}

solution();
