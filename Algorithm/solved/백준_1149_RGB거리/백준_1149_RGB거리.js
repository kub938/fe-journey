const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const rgbPrices = input.slice(1).map((e) => e.split(" ").map(Number));

//3번째 solve 그냥 다 때려 넣는 dp
//각 순간마다 세개의  R -> dp[i-1][G_IDX] 더한값, dp[i-1][B_IDX] 더한값중 최소값, G->R,B,  B -> R,G 를 추가 모든 루트를 dp에 저장
let dp = Array(n)
  .fill(0)
  .map(() => Array(3).fill(0));

function setDP() {
  dp[0][0] = rgbPrices[0][0];
  dp[0][1] = rgbPrices[0][1];
  dp[0][2] = rgbPrices[0][2];

  for (let i = 1; i < n; i++) {
    dp[i][0] = rgbPrices[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] = rgbPrices[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] = rgbPrices[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
  }
}

function solution() {
  setDP();
  console.log(Math.min(...dp[n - 1]));
}

solution();

//2번째 solve 실패
//dp라고 생각했는데 그리디 방식으로 최소한의 성공이 최적의 루트는 아님으로 최적의 루트를 보장하지 못해 실패
// let minValue = Infinity;
// let dp = Array(n).fill(0);
// let nowColor = "";
// let color = ["R", "G", "B"];

// function solution() {
//   dp[1] = initDP();
//   setDP();
//   console.log(dp);
// }

// function setDP() {
//   for (let i = 2; i < n; i++) {
//     switch (nowColor) {
//       case "R":
//         if (rgbPrices[i][1] > rgbPrices[i][2]) {
//           dp[i] = dp[i - 1] + rgbPrices[i][2];
//           nowColor = color[2];
//         } else {
//           dp[i] = dp[i - 1] + rgbPrices[i][1];
//           nowColor = color[1];
//         }

//         break;
//       case "G":
//         if (rgbPrices[i][0] > rgbPrices[i][2]) {
//           dp[i] = dp[i - 1] + rgbPrices[i][2];
//           nowColor = color[2];
//         } else {
//           dp[i] = dp[i - 1] + rgbPrices[i][0];
//           nowColor = color[0];
//         }
//         break;
//       case "B":
//         if (rgbPrices[i][0] > rgbPrices[i][1]) {
//           dp[i] = dp[i - 1] + rgbPrices[i][1];
//           nowColor = color[1];
//         } else {
//           dp[i] = dp[i - 1] + rgbPrices[i][0];
//           nowColor = color[0];
//         }
//         break;
//     }
//   }
// }

// function initDP() {
//   let i = 0;
//   let j = 0;

//   while (i < 3) {
//     if (i == j) {
//       j++;
//     }

//     if (j > 2) {
//       i++;
//       j = 0;
//       continue;
//     }

//     let sumValue = rgbPrices[0][i] + rgbPrices[1][j];
//     if (minValue > sumValue) {
//       nowColor = color[j];
//       minValue = sumValue;
//     }

//     j++;
//   }
//   return minValue;
// }

// solution();
