const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const numbers = input.slice(1).toString().split(" ").map(Number);

function solution() {
  console.log(getMaxSumValue(0, n - 1).maxSum);
}

function getMaxSumValue(l, r) {
  if (l === r) {
    return {
      maxLeftSum: numbers[l], //왼쪽 합
      maxRightSum: numbers[l], //오른쪽 합
      totalSum: numbers[l], //왼쪽 오른쪽 합
      maxSum: numbers[l], // cross 합 까지 3개중 가장 큰 값
    };
  }

  const mid = Math.floor((l + r) / 2);
  const leftResult = getMaxSumValue(l, mid);
  const rightResult = getMaxSumValue(mid + 1, r);

  const totalSum = leftResult.totalSum + rightResult.totalSum;
  const crossSum = rightResult.maxLeftSum + leftResult.maxRightSum;
  const maxSum = Math.max(leftResult.maxSum, rightResult.maxSum, crossSum);
  const maxLeftSum = Math.max(
    leftResult.maxLeftSum,
    leftResult.totalSum + rightResult.maxLeftSum
  );

  const maxRightSum = Math.max(
    rightResult.maxRightSum,
    rightResult.totalSum + leftResult.maxRightSum
  );

  return {
    maxLeftSum,
    maxRightSum,
    totalSum,
    maxSum,
  };
}

solution();
