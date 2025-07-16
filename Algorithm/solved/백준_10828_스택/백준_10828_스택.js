const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 스택 구현 문제
class Stack {
  constructor() {
    this.elements = [];
  }

  push(X) {
    this.elements.push(X);
  }

  pop() {
    if (this.elements[0] === undefined) {
      return -1;
    }
    return this.elements.pop();
  }

  size() {
    return this.elements.length;
  }

  empty() {
    return this.elements.length === 0 ? 1 : 0;
  }

  top() {
    if (this.elements.length === 0) {
      return -1;
    }
    return this.elements[this.elements.length - 1];
  }
}

function solution(input) {
  const N = input[0];
  const order = input.slice(1);
  const stack = new Stack();
  let results = [];

  order.forEach((commandLine) => {
    const parts = commandLine.split(" ");
    const command = parts[0];
    switch (command) {
      case "push":
        stack.push(parseInt(parts[1]));
        break;
      case "pop":
        results.push(stack.pop());
        break;
      case "size":
        results.push(stack.size());
        break;
      case "empty":
        results.push(stack.empty());
        break;
      case "top":
        results.push(stack.top());
        break;
    }
  });

  // 모든 결과를 줄바꿈으로 연결하여 반환
  return results.join("\n");
}

console.log(solution(input));
