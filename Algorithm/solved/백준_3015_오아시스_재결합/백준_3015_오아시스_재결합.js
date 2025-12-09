const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const peoples = input.slice(1).map(Number);

function solution() {
  let stack = [];
  let answer = 0;

  peoples.forEach((now) => {
    // 현재 사람보다 작은 사람들을 모두 pop (이들은 현재 사람과 볼 수 있음)
    while (stack.length > 0 && stack[stack.length - 1] < now) {
      stack.pop();
      answer++;
    }

    // 스택에 남아있는 사람이 있으면 그 사람과도 볼 수 있음
    // (같은 키이거나 더 큰 사람)
    if (stack.length > 0) {
      answer++;
    }

    stack.push(now);
  });

  console.log(answer);
}

solution();
