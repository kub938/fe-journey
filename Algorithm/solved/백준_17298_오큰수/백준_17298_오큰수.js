const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const arr = input.slice(1).toString().split(" ").map(Number);
let stack = [];
let answer = Array(n).fill(-1);

//solve 1
// function solution() {
//   arr.forEach((targetNum, idx) => {
//     if (stack.length === 0) {
//       stack.push([targetNum, idx]);
//       return;
//     }

//     if (stack[stack.length - 1][0] >= targetNum) {
//       stack.push([targetNum, idx]);
//       return;
//     }

//     while (stack.length > 0 && stack[stack.length - 1][0] < targetNum) {
//       const popData = stack.pop();
//       answer[popData[1]] = targetNum;
//     }

//     stack.push([targetNum, idx]);
//   });

//   console.log(...answer);
// }

// solution();

//두번째 solve
//기존 풀이에서 while문에 걸리지 않으면 그냥 push 하면 되기 때문에 굳이 if문으로 구현하지 않고 while문을 돌린 뒤 push하는 형식으로 변경

function solution() {
  arr.forEach((targetNum, idx) => {
    while (stack.length > 0 && stack[stack.length - 1][0] < targetNum) {
      const popData = stack.pop();
      answer[popData[1]] = targetNum;
    }
    stack.push([targetNum, idx]);
  });

  console.log(...answer);
}

solution();
