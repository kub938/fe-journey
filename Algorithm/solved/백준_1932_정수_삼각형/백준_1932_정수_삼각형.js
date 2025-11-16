const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const tri = input.slice(1).map((e) => e.split(" ").map(Number));
const dp = Array(n)
  .fill(0)
  .map((_, i) => Array(i + 1).fill(0));

dp[0][0] = tri[0][0];
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i + 1; j++) {
    if (j === 0) {
      dp[i][j] = dp[i - 1][j] + tri[i][j];
    } else if (j === i) {
      dp[i][j] = dp[i - 1][j - 1] + tri[i][j];
    } else {
      dp[i][j] = tri[i][j] + Math.max(dp[i - 1][j], dp[i - 1][j - 1]);
    }
  }
}

console.log(Math.max(...dp[n - 1]));
