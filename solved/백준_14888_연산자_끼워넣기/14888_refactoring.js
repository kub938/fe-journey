const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const len = +input[0];
const numbers = input[1].split(" ").map(Number);
const operators = input[2].split(" ").map(Number);

let max = -Infinity;
let min = Infinity;

function dfs(num_idx, current_value, operators) {
  if (num_idx === len) {
    max = Math.max(max, current_value);
    min = Math.min(min, current_value);
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (operators[i] > 0) {
      const nextOperators = [...operators];
      nextOperators[i]--;
      dfs(
        num_idx + 1,
        // 1번 방법
        calculate_1(i, numbers[num_idx], current_value),
        // 2번 방법
        // calculate_2[i](current_value, numbers[num_idx]),
        nextOperators
      );
    }
  }
}

// 단순하게 함수를 만들어 사용
function calculate_1(operator, num, current_value) {
  switch (operator) {
    case 0:
      return current_value + num;
    case 1:
      return current_value - num;
    case 2:
      return current_value * num;
    case 3:
      const result = current_value / num;
      return result < 0 ? Math.ceil(result) : Math.floor(result);
  }
}

//배열 안에 함수를 넣어 사용
// const calculate_2 = [
//   (a, b) => a + b,
//   (a, b) => a - b,
//   (a, b) => a * b,
//   (a, b) => ~~(a / b),
// ];

function solution() {
  dfs(1, numbers[0], operators);
  console.log(max === -0 ? 0 : max);
  console.log(min === -0 ? 0 : min);
}

solution();
