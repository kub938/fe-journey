function solution(s) {
  let answer = true;
  let strArr = s.split("");
  let stack = [];

  strArr.forEach((chr) => {
    if (stack.length <= 0) {
      stack.push(chr);
      return;
    }
    if (!isSameChr(stack[stack.length - 1], chr)) {
      stack.push(chr);
    }
    if (isSameChr(stack[stack.length - 1], chr)) {
      stack.pop();
    }
  });

  if (stack.length > 0) {
    answer = false;
  }

  return answer;
}

function isSameChr(left, right) {
  if (left === "(" && right === ")") {
    return true;
  } else {
    return false;
  }
}
