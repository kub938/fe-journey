const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
let result = "";
let dfsArr = [];
let arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);
//그냥 조합
let visited = Array(n).fill(false);

function dfs(depth) {
  if (depth === m) {
    result += dfsArr.join(" ") + "\n";
    return;
  }

  let lastValue = 0;

  for (let i = 0; i < n; i++) {
    //arr[i] !== arr[i-1]로 비교를 했을 때는 [1, 9, 9] 일때 9,9의 케이스가 나올 수 가 없었다
    //for 문을 돌때 전에 선택한 것이 같은 경우에 잡지 않게 조건을 걸어
    //트리 자체가 1, 9, 9 가 아닌 1과 9를 루트로 하는 트리만 형성 되는 구조는 정상이지만
    //단순히 value를 비교하기 때문에 같은 값인 경우인 9,9를 선택 할 수 없다
    //이때는 값을 비교 하며 해당 인덱스에 대한 값을 사용한것인지 아니면 새로운 값만 같은 새로운 값인지 인식 시켜
    //9,9 까지 포함 시켜 주면 된다.

    if (visited[i]) continue; //단순 visited 문
    if (i > 0 && arr[i] === arr[i - 1] && !visited[i - 1]) continue; //여기서의 visited가 arr[i-1]과 arr[i]가 같은 value이며 다른 인덱스인지 확인 하는 값이다.

    dfsArr.push(arr[i]);
    visited[i] = true;
    dfs(depth + 1);
    visited[i] = false;
    dfsArr.pop();
  }
}

dfs(0);
console.log(result);
