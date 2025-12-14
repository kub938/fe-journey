const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
let result = "";
let dfsArr = [];
let arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

function dfs(depth, before) {
  if (depth === m) {
    result += dfsArr.join(" ") + "\n";
    return;
  }

  for (let i = before; i < n; i++) {
    dfsArr.push(arr[i]);
    dfs(depth + 1, i);
    dfsArr.pop();
  }
}

dfs(0, 0);
console.log(result);
