const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
let result = "";
let dfsArr = [];
let arr = input[1].split(" ").map(Number);
let visited = Array(n).fill(false);
arr.sort((a, b) => a - b);

function dfs(depth) {
  if (depth === m) {
    result += dfsArr.join(" ") + "\n";
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    if (i > 0 && arr[i] === arr[i - 1] && !visited[i - 1]) continue; //똑같은데 앞에꺼가 선택 안되어있으면 뒤에것이 앞에 것과 다르다는것을 보장할 수 없기 때문에 continue
    if (dfsArr[depth - 1] > arr[i]) continue;

    visited[i] = true;
    dfsArr.push(arr[i]);
    dfs(depth + 1);
    dfsArr.pop();
    visited[i] = false;
  }
}

dfs(0);
console.log(result);
