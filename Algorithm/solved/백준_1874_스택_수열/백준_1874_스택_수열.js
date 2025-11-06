const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = Number(input[0]);
const targets = input.slice(1).map((e) => Number(e));
const numbers = Array.from({ length: n + 1 }, (_, i) => i);

let stack = [];
let result = [];
let current = 1;

for (let i = 0; i < n; i++) {
  const target = targets[i];

  // target까지 push
  while (current <= target) {
    stack.push(current);
    result.push("+");
    current++;
  }

  // 스택의 top이 target과 같으면 pop
  if (stack[stack.length - 1] === target) {
    stack.pop();
    result.push("-");
  } else {
    // 스택의 top이 target보다 크면 불가능
    console.log("NO");
    process.exit(0);
  }
}

console.log(result.join("\n"));

//96% 에서 틀린 풀이
// for (let i = 0; i < n; i++) {
//   const target = targets[i];
//   while (stack[stack.length - 1] === target) {
//     result.push("-");
//     stack.pop();
//   }

//   if (stack[stack.length - 1] > target) {
//     result = "NO";
//     break;
//   }

//   while (current <= target) {
//     stack.push(current);
//     result.push("+");
//     current++;
//   }
// }
// if (result !== "NO") {
//   console.log(result.join("\n"));
// } else {
//   console.log(result);
// }
