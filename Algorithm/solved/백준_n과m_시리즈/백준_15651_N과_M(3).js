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
let result = "";
function dfs(depth) {
  if (depth === m) {
    result += arr.join(" ") + "\n";
    return;
  }

  for (let i = 1; i < n + 1; i++) {
    arr.push(i);
    dfs(depth + 1);
    arr.pop();
  }
}

dfs(0);
console.log(result);
