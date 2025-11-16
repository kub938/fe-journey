const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const t = Number(input[0]);
const numArr = input.slice(1).map((e) => Number(e));

let answer = "";
let fiboArr = Array(41)
  .fill(0)
  .map(() => [0, 0]);

fiboArr[0][0] = 1;
fiboArr[1][1] = 1;

function fibonacci(n) {
  if (fiboArr[n][0] != 0 || fiboArr[n][1] != 0) {
    return fiboArr[n];
  }

  for (let i = 2; i < n + 1; i++) {
    fiboArr[i][0] = fiboArr[i - 1][0] + fiboArr[i - 2][0];
    fiboArr[i][1] = fiboArr[i - 1][1] + fiboArr[i - 2][1];
  }

  return fiboArr[n];
}

numArr.forEach((n) => {
  resultArr = fibonacci(n);
  answer += `${resultArr[0]} ${resultArr[1]}\n`;
});

console.log(answer);
