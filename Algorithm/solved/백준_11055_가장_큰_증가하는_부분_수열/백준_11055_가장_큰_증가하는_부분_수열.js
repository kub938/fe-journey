const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");
const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

//arr에서 더 작은값 찾아서 해당 index의 dp 값을 지금 arr[i]에 더해서 넣어 놔
//현재 arr[i]에 대해서 arr[j]가 arr[i]보다 작은값 들 중 dp[j]가 가장 큰 값을 dp[i]에 넣는다
//그 후 dp[i]에서 젤 큰 값이 정답

function solution() {
  let dp = Array(n).fill(0);
  dp[0] = arr[0];
  for (let i = 0; i < n; i++) {
    let maxValue = 0;
    dp[i] = arr[i];
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        maxValue = Math.max(dp[j], maxValue);
      }
    }
    dp[i] = maxValue + dp[i];
  }

  let answer = 0;
  for (let i = 0; i < n; i++) {
    answer = Math.max(dp[i], answer);
  }

  console.log(answer);
}

solution();
