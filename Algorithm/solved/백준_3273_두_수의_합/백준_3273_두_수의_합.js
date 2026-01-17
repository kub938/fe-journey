const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const x = Number(input[2]);
let answer = 0;

function solution() {
  let left = 0;
  let right = n - 1;
  let sumValue = 0;
  arr.sort((a, b) => a - b);

  while (left < right) {
    sumValue = arr[left] + arr[right];

    if (sumValue > x) {
      right--;
    } else if (sumValue < x) {
      left++;
    } else if (sumValue === x) {
      left++;
      answer++;
    }
  }

  console.log(answer);
}

solution();
