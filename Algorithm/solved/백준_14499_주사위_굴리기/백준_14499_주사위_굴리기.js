const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m, X, Y, k] = input[0].split(" ").map(Number);
let board = input.slice(1, n + 1).map((e) => e.split(" ").map(Number));
const moveOrder = input[input.length - 1].split(" ").map((e) => Number(e) - 1);
const [dx, dy] = [
  [0, 0, -1, 1],
  [1, -1, 0, 0],
];
let dice = [0, 0, 0, 0, 0, 0];
let nowPos = [X, Y];

function spinDice(dir) {
  const copyDice = [...dice];
  switch (dir) {
    //0, 1서로 반대 , 2,3 서로 반대
    case 0:
      dice[0] = copyDice[3];
      dice[2] = copyDice[0];
      dice[3] = copyDice[5];
      dice[5] = copyDice[2];
      break;
    case 1:
      dice[3] = copyDice[0];
      dice[0] = copyDice[2];
      dice[5] = copyDice[3];
      dice[2] = copyDice[5];
      break;
    case 2:
      dice[1] = copyDice[0];
      dice[5] = copyDice[1];
      dice[0] = copyDice[4];
      dice[4] = copyDice[5];
      break;
    case 3:
      dice[0] = copyDice[1];
      dice[1] = copyDice[5];
      dice[4] = copyDice[0];
      dice[5] = copyDice[4];
      break;
  }
}

function move(dir) {
  const [x, y] = nowPos;
  const [nx, ny] = [x + dx[dir], y + dy[dir]];

  if (!inRange(nx, ny)) return false;

  spinDice(dir);

  if (board[nx][ny] === 0) {
    board[nx][ny] = dice[0];
  } else {
    dice[0] = board[nx][ny];
    board[nx][ny] = 0;
  }

  nowPos = [nx, ny];
  return true;
}

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}

function solution() {
  let answer = "";
  moveOrder.forEach((dir) => {
    if (move(dir)) {
      answer += `${dice[5]}\n`;
    }
  });

  console.log(answer);
}

solution();
