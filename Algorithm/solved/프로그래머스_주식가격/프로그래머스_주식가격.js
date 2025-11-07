// 강의에서 for문으로 해결한 뒤 queue로 변형해서 한번더 풀이 하지만 시간초과로 오답
// function solution(prices) {
//   const n = prices.length;
//   let answer = Array(n).fill(0);

//   nowIdx = 0;
//   while (prices.length > 0) {
//     const target = prices.shift();
//     let flag = false;

//     for (let i = 0; i < prices.length; i++) {
//       if (target > prices[i]) {
//         answer[nowIdx] = i + 1;
//         flag = true;
//         break;
//       }
//     }

//     if (!flag) {
//       answer[nowIdx] = prices.length;
//     }

//     nowIdx += 1;
//   }
//   return answer;
// }

// 스택이 더 적합하다 판단해 스택으로 풀이 O(n)
function solution(prices) {
  const n = prices.length;
  let answer = Array(n).fill(0);
  let stack = [];

  for (let i = n - 1; i >= 0; i--) {
    const target = [prices[i], i];

    while (stack.length > 0) {
      if (stack[stack.length - 1][0] < target[0]) {
        answer[i] = stack[stack.length - 1][1] - i;
        stack.push(target);
        break;
      } else {
        stack.pop();
      }
    }

    if (stack.length <= 0) {
      answer[i] = n - i - 1;
      stack.push(target);
      continue;
    }
  }

  return answer;
}
