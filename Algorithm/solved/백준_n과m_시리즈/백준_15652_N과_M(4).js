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
function dfs(depth, before) {
  if (depth === m) {
    result += arr.join(" ") + "\n";
    return;
  }

  for (let i = before; i < n + 1; i++) {
    arr.push(i);
    dfs(depth + 1, i);
    arr.pop();
  }
}

dfs(0, 1);
console.log(result);
