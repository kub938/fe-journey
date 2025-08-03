const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = Number(fs.readFileSync(file_path).toString().trim());

//여기서 dp[i] i 는 값 value는 연산횟수 n은 1000000까지
//dp[k] = dp[k/3] + 1
//dp[k] = dp[k/2] + 1
//dp[k] = dp[k-1] + 1

//나누기는 누누어 떨어질때만 사용
// 저 세개의 값 중 가장 적은 값 사용
// 그럼 백만까지 일단 배열 구해
// 기저값은 0 = 1, 1 = 1, 2 = 1, 3 = 1

let dp = [0, 0, 0];

function cal_dp(i) {
  let div3 = Infinity;
  let div2 = Infinity;
  let minus1 = Infinity;

  if (i % 3 === 0) {
    div3 = dp[i / 3] + 1;
  }
  if (i % 2 === 0) {
    div2 = dp[i / 2] + 1;
  }
  minus1 = dp[i - 1] + 1;

  return Math.min(div3, div2, minus1);
}

function solution() {
  for (let i = 2; i < n + 1; i++) {
    dp[i] = cal_dp(i);
  }

  console.log(dp[n]);
}

solution();
