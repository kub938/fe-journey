const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");

const n = Number(input[0]);
const schedule = input
  .slice(1)
  .map((e) => e.split(" ").map((num) => Number(num)));

let dp = Array.from({ length: n }, () => Array(2).fill(0));

let result = 0;

for (let i = 0; i < n; i++) {
  const Ti = schedule[i][0] - 1;
  const Pi = schedule[i][1];

  const target = Ti + i;

  if (target > n) {
    continue;
  }

  dp[target][1] = Math.max(dp[target][1], dp[i][1] + Pi); //해당하는 Ti, Pi 일때

  console.log(dp);
  result = Math.max(dp[target][1], result);
}

console.log(dp);
