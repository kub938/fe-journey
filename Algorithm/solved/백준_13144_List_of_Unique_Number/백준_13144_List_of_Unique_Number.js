const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const numbers = input[1].split(" ").map(Number);
const visited = Array(100001).fill(0);

//핵심은 numbers[i]에서 할 수 있는 최대의 수열의 갯수를 얻는 것
//이미 진행한 것은 내붇고 left만 한칸씩 움직여서 다음 인덱스에서의
function solution() {
  let left = 0;
  let right = 0;
  let ans = 0;
  while (left < n) {
    while (right < n && visited[numbers[right]] === 0) {
      visited[numbers[right]] = 1;
      right++;
    }

    ans += right - left;

    visited[numbers[left]] = 0;
    left++;
  }

  console.log(ans);
}

solution();
