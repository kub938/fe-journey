const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const n = fs.readFileSync(file_path).toString().trim();

let dp = [0n, 1n, 1n];

for (let i = 3; i <= n; i++) {
  dp.push(dp[i - 1] + dp[i - 2]);
}

console.log(dp[n].toString());
