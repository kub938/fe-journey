const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

//두번째 풀이
//배열 삭제 해고 그냥 numbers에서 조건문으로 chance 판단
function solution() {
  let left = 0;
  let right = 0;
  let chance = 0;
  let maxLength = 0;

  while (left < n) {
    while (right < n) {
      if (numbers[right] % 2 === 1 && chance === k) break;
      if (numbers[right] % 2 === 1) chance++;
      right++;
    }
    maxLength = Math.max(maxLength, right - left - chance);
    if (numbers[left] % 2 === 1) {
      chance -= 1;
    }
    left++;
  }

  console.log(maxLength);
}

solution();

//처음 풀이
// function solution() {
//   let left = 0;
//   let right = 0;
//   let usedChance = Array(1000001).fill(0);
//   let chance = k;
//   let maxLength = 0;

//   while (left < n) {
//     while (right < n) {
//       if (numbers[right] % 2 === 0) {
//         right++;
//         continue;
//       }

//       if (chance > 0) {
//         usedChance[right] = 1;
//         chance -= 1;
//         right++;
//         continue;
//       }

//       break;
//     }

//     maxLength = Math.max(maxLength, right - left - (k - chance));
//     if (usedChance[left] === 1) {
//       usedChance[left] = 0;
//       chance++;
//     }

//     left++;
//   }

//   console.log(maxLength);
// }

// solution();
