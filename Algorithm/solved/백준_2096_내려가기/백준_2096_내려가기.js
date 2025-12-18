const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");
const n = Number(input[0]);
const arr = input.slice(1).map((e) => e.split(" ").map(Number));

// 처음 풀이
// 메모리 초과 나서 두번째 풀이에서 최적화 했는데 그냥 js로 통과가 안되는 문제였음
// 이 풀이도 java로 바꿔서 제출하면 통과
// let dp = Array(n)
//   .fill(0)
//   .map((_) =>
//     Array(3)
//       .fill(0)
//       .map((_) => Array(2).fill(0))
//   );

// function solution() {
//   initDP();
//   calcDP();

//   answer = [
//     Math.max(dp[n - 1][0][1], dp[n - 1][1][1], dp[n - 1][2][1]),
//     Math.min(dp[n - 1][0][0], dp[n - 1][1][0], dp[n - 1][2][0]),
//   ];
//   console.log(answer.join(" "));
// }

// function initDP() {
//   dp[0][0][0] = arr[0][0];
//   dp[0][0][1] = arr[0][0];
//   dp[0][1][0] = arr[0][1];
//   dp[0][1][1] = arr[0][1];
//   dp[0][2][0] = arr[0][2];
//   dp[0][2][1] = arr[0][2];
// }

// function calcDP() {
//   for (let i = 1; i < n; i++) {
//     //dp 앞의 두/세 개랑 비교해서 가장 큰/작은 값을 현재 값에다 삽입
//     //0 = min, 1=max
//     dp[i][0][0] = arr[i][0] + Math.min(dp[i - 1][0][0], dp[i - 1][1][0]);
//     dp[i][0][1] = arr[i][0] + Math.max(dp[i - 1][0][1], dp[i - 1][1][1]);

//     dp[i][1][0] =
//       arr[i][1] + Math.min(dp[i - 1][0][0], dp[i - 1][1][0], dp[i - 1][2][0]);
//     dp[i][1][1] =
//       arr[i][1] + Math.max(dp[i - 1][0][1], dp[i - 1][1][1], dp[i - 1][2][1]);

//     dp[i][2][0] = arr[i][2] + Math.min(dp[i - 1][1][0], dp[i - 1][2][0]);
//     dp[i][2][1] = arr[i][2] + Math.max(dp[i - 1][1][1], dp[i - 1][2][1]);
//   }
// }

// solution();

let before = [
  [0, 0],
  [0, 0],
  [0, 0],
];
let after = [
  [0, 0],
  [0, 0],
  [0, 0],
];
function solution() {
  initDP();
  calcDP();

  const maxVal = Math.max(before[0][1], before[1][1], before[2][1]);
  const minVal = Math.min(before[0][0], before[1][0], before[2][0]);
  console.log(maxVal, minVal);
}

function initDP() {
  before[0][0] = arr[0][0];
  before[0][1] = arr[0][0];
  before[1][0] = arr[0][1];
  before[1][1] = arr[0][1];
  before[2][0] = arr[0][2];
  before[2][1] = arr[0][2];
}

function calcDP() {
  for (let i = 1; i < n; i++) {
    //dp 앞의 두/세 개랑 비교해서 가장 큰/작은 값을 현재 값에다 삽입
    //0 = min, 1=max
    after[0][0] = arr[i][0] + Math.min(before[0][0], before[1][0]);
    after[0][1] = arr[i][0] + Math.max(before[0][1], before[1][1]);

    after[1][0] =
      arr[i][1] + Math.min(before[0][0], before[1][0], before[2][0]);
    after[1][1] =
      arr[i][1] + Math.max(before[0][1], before[1][1], before[2][1]);

    after[2][0] = arr[i][2] + Math.min(before[1][0], before[2][0]);
    after[2][1] = arr[i][2] + Math.max(before[1][1], before[2][1]);

    before[0][0] = after[0][0];
    before[0][1] = after[0][1];
    before[1][0] = after[1][0];
    before[1][1] = after[1][1];
    before[2][0] = after[2][0];
    before[2][1] = after[2][1];
  }
}

solution();
