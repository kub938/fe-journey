const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const graph = [];

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

function in_range(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}

function bfs(visited) {
  let que = [[0, 0]];
  visited[0][0] = 1;

  while (que.length !== 0) {
    let [x, y] = que.shift();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (in_range(nx, ny) && visited[nx][ny] === 0 && graph[nx][ny] === "1") {
        que.push([nx, ny]);
        visited[nx][ny] = visited[x][y] + 1;
      }
    }
  }
}

function solution(input) {
  input.slice(1).forEach((e) => graph.push(e.split("")));
  let visited = new Array(n).fill(0).map((e) => Array(m).fill(0));
  bfs(visited);
  console.log(visited[n - 1][m - 1]);
}

solution(input);
