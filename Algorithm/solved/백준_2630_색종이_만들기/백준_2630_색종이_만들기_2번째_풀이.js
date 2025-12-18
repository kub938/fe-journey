//일단 상대적으로 변하는건 half랑 r,c가 계속 상대적으로 변하면서 줄어듬
//half * half에서의 값이 통일되어 있는곳, half가 1인곳 에서 return 하면됨
//그럼 check 하는 함수 하나랑 계속 쪼개는 함수 하나로 갯수를 구함

const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");
const n = input[0];
const board = input.slice(1).map((e) => e.split(" ").map(Number));

let ans = [0, 0];
function div(half, r, c) {
  if (half === 1 || check(half, r, c)) {
    ans[board[r][c]] += 1;
    return;
  }

  half = Math.floor(half / 2);

  div(half, r, c);
  div(half, r + half, c);
  div(half, r, c + half);
  div(half, r + half, c + half);
}

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

function solution() {
  div(n, 0, 0);
  console.log(ans.join("\n"));
}

solution();
