//스택을 활용해 문제 풀이
//현재 타워를 설정하고 스택 안을 확인해 현재 타워의 value 보다 낮은 값이면 pop 해서 제거
//현재 값보다 높은 값이라면 result[현재타워의 인덱스] = 스택 맨 위에있는 값의 인덱스로 변환

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const towers = input[1].split(" ").map((t) => Number(t));
let stack = [];
let result = Array(n).fill(0);

for (let i = 0; i < n; i++) {
  nowTower = [towers[i], i];

  while (stack.length > 0 && stack[stack.length - 1][0] < nowTower[0]) {
    stack.pop();
  }

  if (stack.length > 0 && stack[stack.length - 1][0] >= nowTower[0]) {
    result[nowTower[1]] = stack[stack.length - 1][1] + 1;
  }
  stack.push(nowTower);
}

console.log(...result);
