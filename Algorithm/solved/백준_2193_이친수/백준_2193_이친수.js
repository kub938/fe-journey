const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();
const n = Number(input);

let dp = Array(n + 1)
  .fill(0n)
  .map(() => Array(2).fill(0n));

dp[1][0] = 0n;
dp[1][1] = 1n;

for (let i = 2; i < n + 1; i++) {
  dp[i][0] = dp[i - 1][0] + dp[i - 1][1];
  dp[i][1] = dp[i - 1][0];
}

console.log(String(dp[n][0] + dp[n][1]));
