const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = input.slice(1).map((e) => e.split(" ").map(Number));
const tetrominos = [
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
];

//다시풀기
//테트로미노 추가 안하고 그때그때 다 돌려서 사용해서 시간초과 남
//테트로미노 추가할때 왼쪽위 기준으로 정렬 안해서 틀림
function solution() {
  let answer = 0;
  makeTetrominos();
  answer = calMaxSumValue();
  console.log(answer);
}

function makeTetrominos() {
  for (let i = 0; i < 5; i++) {
    let current = tetrominos[i];
    for (let j = 0; j < 4; j++) {
      tetrominos.push(alignTopLeft(current));
      tetrominos.push(alignTopLeft(leftRightMirroring(current)));
      current = spin(current);
    }
  }
}

//회전
function spin(tetromino) {
  let newTetromino = Array(4)
    .fill(0)
    .map((_) => Array(4).fill(0));

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newTetromino[j][3 - i] = tetromino[i][j];
    }
  }

  return newTetromino;
}

function leftRightMirroring(tetromino) {
  let newTetromino = Array(4)
    .fill(0)
    .map((_) => Array(4).fill(0));

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newTetromino[i][3 - j] = tetromino[i][j];
    }
  }

  return newTetromino;
}

function alignTopLeft(tetromino) {
  let minX = 4,
    minY = 4;

  // 1이 있는 가장 위쪽(minX), 가장 왼쪽(minY) 좌표 찾기
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (tetromino[i][j] === 1) {
        minX = Math.min(minX, i);
        minY = Math.min(minY, j);
      }
    }
  }

  // 찾은 여백만큼 당겨서 새로운 배열에 그리기
  let newTetromino = Array(4)
    .fill(0)
    .map((_) => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (tetromino[i][j] === 1) {
        newTetromino[i - minX][j - minY] = 1;
      }
    }
  }
  return newTetromino;
}
//합
function sumValue(tetromino, start) {
  const [x, y] = start;
  let sumValue = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (tetromino[i][j] === 1) {
        const nx = x + i;
        const ny = y + j;

        if (!inRange(nx, ny)) {
          return 0;
        }

        // 범위 안이면 합산
        sumValue += board[nx][ny];
      }
    }
  }

  return sumValue;
}

function calMaxSumValue() {
  let maxValue = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < tetrominos.length; k++) {
        maxValue = Math.max(sumValue(tetrominos[k], [i, j]), maxValue);
      }
    }
  }

  return maxValue;
}
function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}

solution();
