const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const board = input.slice(1).map((e) => e.split(" ").map(Number));

const ans = [0, 0, 0];

function checkBoard(size, r, c) {
  const type = board[r][c];
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      if (board[i][j] !== type) {
        return false;
      }
    }
  }
  return true;
}

function divBoard(size, r, c) {
  if (size === 1 || checkBoard(size, r, c)) {
    ans[board[r][c] + 1] += 1;
    return;
  }

  const divSize = Math.floor(size / 3);

  divBoard(divSize, r, c);
  divBoard(divSize, r, c + divSize);
  divBoard(divSize, r, c + divSize * 2);
  divBoard(divSize, r + divSize, c);
  divBoard(divSize, r + divSize * 2, c);
  divBoard(divSize, r + divSize, c + divSize);
  divBoard(divSize, r + divSize * 2, c + divSize * 2);
  divBoard(divSize, r + divSize, c + divSize * 2);
  divBoard(divSize, r + divSize * 2, c + divSize);
}

function solution() {
  divBoard(n, 0, 0);

  console.log(ans.join("\n"));
}

solution();
