const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
let result = "";
let dfsArr = [];
let arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

//처음 풀이
//set을 사용해서 초기에 중복을 제거 시킨다음 진행
// arr = new Set(arr);
// arr = [...arr];

// function dfs(depth) {
//   if (depth === m) {
//     result += dfsArr.join(" ") + "\n";
//     return;
//   }

//   for (let i = 0; i < arr.length; i++) {
//     dfsArr.push(arr[i]);
//     dfs(depth + 1);
//     dfsArr.pop();
//   }
// }

// dfs(0);
// console.log(result);

//두번째 풀이
//중복을 제거 시키지는 않고 가지 치기를 사용해서 중복되는 숫자를 제거하는 방법
let visited = Array(n).fill(false);
function dfs2(depth) {
  if (depth === m) {
    result += dfsArr.join(" ") + "\n";
    return;
  }

  for (let i = 0; i < n; i++) {
    if (i > 0 && arr[i] === arr[i - 1] && !visited[i - 1]) continue;

    visited[i] = true;
    dfsArr.push(arr[i]);
    dfs2(depth + 1);
    dfsArr.pop();
    visited[i] = false;
  }
}

dfs2(0);
console.log(result);
