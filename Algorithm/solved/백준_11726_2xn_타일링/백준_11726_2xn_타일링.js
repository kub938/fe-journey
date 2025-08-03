const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = Number(fs.readFileSync(file_path).toString().trim());

let dp = new Array(n + 1).fill(0);
let DIV_NUM = 10007;
dp[1] = 1;
dp[2] = 2;
for (let i = 3; i <= n; i++) {
  dp[i] = ((dp[i - 1] % DIV_NUM) + (dp[i - 2] % DIV_NUM)) % DIV_NUM;
}

console.log(dp[n] % DIV_NUM);
