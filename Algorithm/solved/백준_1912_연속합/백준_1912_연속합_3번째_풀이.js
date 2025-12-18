const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const numbers = input.slice(1).toString().split(" ").map(Number);

function solution() {
  let dp = Array(n).fill(0);
  dp[0] = numbers[0];
  let maxValue = numbers[0];
  for (let i = 1; i < n; i++) {
    if (dp[i - 1] + numbers[i] < numbers[i]) {
      dp[i] = numbers[i];
    } else {
      dp[i] = dp[i - 1] + numbers[i];
    }
    maxValue = Math.max(dp[i], maxValue);
  }
  console.log(maxValue);
}

solution();
