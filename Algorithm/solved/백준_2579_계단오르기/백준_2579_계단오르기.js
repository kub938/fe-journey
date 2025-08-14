const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");
const n = Number(input[0]);
const stair = input.slice(1).map((e) => Number(e));

function solution() {
  const dp = new Array(n + 1).fill(0);

  dp[0] = 0;
  dp[1] = stair[0];
  dp[2] = Math.max(stair[0], stair[0] + stair[1]);

  //case 1
  //두칸씩 띄어서 왔을 경우 = 무조건 조건 성립
  //case 2
  //한칸씩 띄어서 왔을 경우 = 세칸 연속일 수 있음 이 경우를 위해
  //한칸 + 두칸의 경우를 케이스로 둠

  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(
      dp[i - 2] + stair[i - 1],
      dp[i - 3] + stair[i - 1] + stair[i - 2]
    );
  }
  console.log(dp);
}

solution();
