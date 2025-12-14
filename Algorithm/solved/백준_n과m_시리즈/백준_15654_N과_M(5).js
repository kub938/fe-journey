const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
let result = "";
let selectArr = [];
let visited = Array(n).fill(0);
//처음에 arr.sort()로 해서 오답처리
//.sort()는 비교하는 값을 .toString()으로 변환 시켜 맨 앞글자부터 사전순으로 정렬시키기 때문에 만약
//2와 10을 정렬 한다면 의도는 [2,10] 이겠지만
//.sort()는 "2"와 "1"을 비교해 [10, 2]의 결과 값을 도출함
//그렇기 때문에 sort를 사용할 때는 수로 비교하기 위해 a,b => a-b를 기입해줘야 의도한대로 Number사이의 정렬을 완수할 수 있음

arr.sort((a, b) => a - b);

function dfs(depth) {
  if (depth === m) {
    result += selectArr.join(" ") + "\n";
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i] === 0) {
      visited[i] = 1;
      selectArr.push(arr[i]);
      dfs(depth + 1);
      selectArr.pop();
      visited[i] = 0;
    }
  }
}

dfs(0);
console.log(result);
