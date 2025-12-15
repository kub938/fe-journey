const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

let result = [];
let answer = "";
let visited = Array(n).fill(false);

function dfs(depth, start) {
  if (depth === m) {
    answer += result.join(" ") + "\n";
    return;
  }

  for (let i = start; i < n; i++) {
    if (i > 0 && arr[i] === arr[i - 1] && !visited[i - 1]) continue;

    visited[i] = true;
    result.push(arr[i]);
    dfs(depth + 1, i);
    result.pop();
    visited[i] = false;
  }
}

// dfs(0, 0);
// console.log(answer);

arr = new Set(arr);
arr = Array.from(arr);

function dfs2(depth, start) {
  if (depth === m) {
    answer += result.join(" ") + "\n";
    return;
  }

  for (let i = start; i < arr.length; i++) {
    result.push(arr[i]);
    dfs2(depth + 1, i);
    result.pop();
  }
}

dfs2(0, 0);
console.log(answer);
