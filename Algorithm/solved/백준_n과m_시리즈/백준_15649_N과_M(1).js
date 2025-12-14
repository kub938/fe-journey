const fs = require("fs");
let input;
if (process.platform === "linux") {
  input = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);
} else {
  input = [4, 2];
}

const [n, m] = input;

let arr = [];
let visited = Array(n + 1).fill(0);
let result = "";
function dfs(depth) {
  if (depth === m) {
    // 아래와 같이 배열로 만들어서 넣어놓으면 시간 복잡도 손해
    // result.push([...arr]);
    result += arr.join(" ") + "\n";
    return;
  }

  for (let i = 1; i < n + 1; i++) {
    if (visited[i] === 0) {
      arr.push(i);
      visited[i] = 1;
      dfs(depth + 1);
      arr.pop();
      visited[i] = 0;
    }
  }
}

dfs(0);
console.log(result);
