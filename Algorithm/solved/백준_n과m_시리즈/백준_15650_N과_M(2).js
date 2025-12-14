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
let result = "";
let arr = [];
let visited = Array(n + 1).fill(0);

function dfs(depth, start) {
  if (depth === m) {
    result += arr.join(" ") + "\n";
    return;
  }

  for (let i = start + 1; i < n + 1; i++) {
    if (visited[i] === 0) {
      visited[i] = 1;
      arr.push(i);
      //넘길때 start를 넘기는게 아니라 i를 넘겨야 한다 start의 스코프는 초기에 받은 값에서 변하지 않고 i가 유동적으로 변하는 것이기 때문에
      //start를 넘긴다면 예상하지 않은 값이 나오게 된다
      dfs(depth + 1, i);
      arr.pop();
      visited[i] = 0;
    }
  }
}

dfs(0, 0);
console.log(result);
