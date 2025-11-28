const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const buildings = input.slice(1).map(Number);
let stack = [];
let answer = 0;

function solution() {
  buildings.forEach((targetHeight) => {
    while (stack[stack.length - 1] <= targetHeight) {
      stack.pop();
    }

    if (stack.length === 0) {
      stack.push(targetHeight);
    }

    if (stack[stack.length - 1] > targetHeight) {
      answer += stack.length;
      stack.push(targetHeight);
    }
  });

  console.log(answer);
}

solution();
