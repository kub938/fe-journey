const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const numbers = input.slice(1).toString().split(" ").map(Number);

//첫번재 문제 풀이
// dp 2차원 배열
// i는 -를 한것과 +를 한것들의 현재 최대 값과 지금까지의 최대값을 구하고
// numbers에 -만 있어서 결과 값이 0이 나올 경우를 대비해 flag를 사용해 음수만 있는 경우를 처리
//

// let flag = false;

// function solution() {
//   let dp = Array(3)
//     .fill(0)
//     .map(() => Array(n).fill(0));

//   dp[0][0] = numbers[0]; // - 한거
//   dp[1][0] = numbers[0] < 0 ? 0 : numbers[0]; // - 안한거
//   dp[2][0] = numbers[0]; // 최대값
//   //다 하고나서 maxValue가 -이면 그냥 - 값들 중 가장 작은  값 ㅊ찾아서 출력

//   for (let i = 1; i < n; i++) {
//     if (numbers[i] < 0) {
//       dp[0][i] = numbers[i] + Math.max(dp[0][i - 1], dp[1][i - 1]);
//       dp[1][i] = Math.max(dp[0][i - 1], dp[1][i - 1]);
//       dp[2][i] =
//         dp[2][i - 1] > Math.max(dp[0][i], dp[1][i])
//           ? dp[2][i - 1]
//           : Math.max(dp[0][i], dp[1][i]);
//       dp[1][i] = 0;
//     } else if (numbers[i] >= 0) {
//       flag = true;
//       dp[0][i] = numbers[i] + dp[0][i - 1];
//       dp[1][i] = numbers[i] + dp[1][i - 1];
//       dp[2][i] =
//         dp[2][i - 1] > Math.max(dp[0][i], dp[1][i])
//           ? dp[2][i - 1]
//           : Math.max(dp[0][i], dp[1][i]);
//     }
//   }

//   if (flag) {
//     console.log(dp[2][n - 1]);
//   } else {
//     let maxValue = -Infinity;
//     numbers.forEach((e) => {
//       if (e > maxValue) {
//         maxValue = e;
//       }
//     });
//     console.log(maxValue);
//   }
// }

// solution();

//DP 문제 풀이 공략
// 1. for 문으로 생각해본다

// 2. 반복 1회마다 나온 결과값들의 중복 여부를 찾는다.

// 3. 어떤 부분을 저장하면 중복 제거가 가능한지 확인한다.
// ex) i번째까지의 ~~

//2번째 풀이
//i는 현재 값을 포함하고 있는 최대값
//dp[i-1] + numbers[i] => 이건 지금까지의 숫자들(다시 시작한 부분 ~ 현재값)을 더한 값
// numbers[i] => 이건 앞에 있는 숫자들 값 + 현재값 보다 새로 시작하는 값이 더 크면 다시 시작한다는 뜻

function solution() {
  let dp = Array(n).fill(0);
  dp[0] = numbers[0];
  let maxValue = numbers[0];

  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1] + numbers[i], numbers[i]);
    maxValue = dp[i] > maxValue ? dp[i] : maxValue;
  }
  console.log(maxValue);
}

solution();
