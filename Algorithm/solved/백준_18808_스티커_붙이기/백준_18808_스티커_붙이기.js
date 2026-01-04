const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m, k] = input[0].split(" ").map(Number);

let board = Array(n)
  .fill(0)
  .map((_) => Array(m).fill(0));
let stickerSizes = [];
let stickers = [];
let answer = 0;

function initSticker() {
  let i = 1;

  while (i < input.length) {
    const size = input[i].split(" ").map(Number);
    stickerSizes.push(size);

    const sticker = input
      .slice(i + 1, i + size[0] + 1)
      .map((e) => e.split(" ").map(Number));
    stickers.push(sticker);

    i += size[0] + 1;
  }
}

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}

function rotate(stickerType) {
  const [r, c] = stickerSizes[stickerType];
  const sticker = stickers[stickerType];
  let rotated = Array(c)
    .fill(0)
    .map((_) => Array(r).fill(0));

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      rotated[j][r - 1 - i] = sticker[i][j];
    }
  }
  stickers[stickerType] = rotated;
  stickerSizes[stickerType] = [c, r];
}

function attach(x, y, stickerType) {
  const [r, c] = stickerSizes[stickerType];
  const sticker = stickers[stickerType];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (sticker[i][j] === 1) {
        board[i + x][j + y] = 1;
      }
    }
  }
}

function check(x, y, stickerType) {
  const [r, c] = stickerSizes[stickerType];
  const sticker = stickers[stickerType];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const [nx, ny] = [x + i, y + j];
      if (!inRange(nx, ny)) return false;
      if (sticker[i][j] === 1 && board[nx][ny] !== 0) return false;
    }
  }

  return true;
}

function cntSticker() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 1) {
        answer += 1;
      }
    }
  }
}

function solution() {
  initSticker();

  for (let stickerType = 0; stickerType < k; stickerType++) {
    let flag = false;
    for (let i = 0; i < 4; i++) {
      for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
          if (check(x, y, stickerType)) {
            attach(x, y, stickerType);
            flag = true;
            break;
          }
        }
        if (flag) break;
      }
      if (flag) break;
      rotate(stickerType);
    }
  }

  cntSticker();

  console.log(answer);
}

solution();
