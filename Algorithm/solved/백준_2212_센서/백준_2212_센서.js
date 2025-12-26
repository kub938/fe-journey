const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const k = Number(input[1]);
let load = input[2].split(" ").map(Number);
let ans = 0;

load.sort((a, b) => a - b);

let diff = Array(n - 1).fill(0);

for (let i = 0; i < n - 1; i++) {
  diff[i] = load[i + 1] - load[i];
}

diff.sort((a, b) => b - a);

for (let i = k - 1; i < diff.length; i++) {
  ans += diff[i];
}

console.log(ans);
