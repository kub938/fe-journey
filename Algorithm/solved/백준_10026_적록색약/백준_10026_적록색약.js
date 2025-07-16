const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = +input[0];
const board = input.slice(1).map((e) => e.toString().split(""));
let visited = new Array(n).fill(false).map((e) => new Array(n).fill(false));
const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, -1, 1],
];

function in_range(x, y) {
  return 0 <= x && x < n && 0 <= y && y < n;
}
function bfs(type, x, y) {
  let que = [[x, y]];

  while (que.length > 0) {
    let [x, y] = que.shift();
    for (let i = 0; i < 4; i++) {
      let [nx, ny] = [x + dx[i], y + dy[i]];

      if (!in_range(nx, ny)) continue;
      if (visited[nx][ny]) continue;

      if (board[nx][ny] !== board[x][y]) {
        if (type === 0) {
          continue;
        } else if (type === 1) {
          if (
            (board[nx][ny] !== "G" || board[x][y] !== "R") &&
            (board[nx][ny] !== "R" || board[x][y] !== "G")
          )
            continue;
        }
      }

      visited[nx][ny] = true;
      que.push([nx, ny]);
    }
  }
}

function solution() {
  let type0 = 0;
  let type1 = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        type0++;
        bfs(0, i, j);
      }
    }
  }

  visited = new Array(n).fill(false).map((e) => new Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        type1++;
        bfs(1, i, j);
      }
    }
  }

  console.log(type0, type1);
}

solution();
