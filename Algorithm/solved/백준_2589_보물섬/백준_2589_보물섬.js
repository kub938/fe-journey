const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const board = input.slice(1).map((e) => e.split(""));
const [dx, dy] = [
  [-1, 1, 0, 0],
  [0, 0, -1, 1],
];
let max_value = -Infinity;

function in_range(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}

function bfs(x, y) {
  let visited = new Array(n).fill(0).map((e) => new Array(m).fill(0));
  let que = [[x, y]];
  visited[x][y] = 1;

  while (que.length > 0) {
    const [x, y] = que.shift();

    for (let i = 0; i < 4; i++) {
      let [nx, ny] = [x + dx[i], y + dy[i]];
      if (in_range(nx, ny) && visited[nx][ny] < 1 && board[nx][ny] === "L") {
        que.push([nx, ny]);
        visited[nx][ny] = visited[x][y] + 1;
        max_value = Math.max(max_value, visited[nx][ny]);
      }
    }
  }
}

function solution() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === "L") {
        bfs(i, j);
      }
    }
  }

  console.log(max_value - 1);
}

solution();
