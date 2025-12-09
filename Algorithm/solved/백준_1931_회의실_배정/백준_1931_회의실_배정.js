//제일 빨리 끝나는거 선택
//앞에꺼 비교하면서 현재 end 보다 크면 그거 바로 선택

//엣지케이스
//2
//2 2
//1 2 일때 정렬시 앞부분이 더 작은게 앞으로 오게 정렬해야지 1 2를 사용하고 2 2를 사용할 수 있다.
const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = Number(input[0]);
const arr = input.slice(1).map((e) => e.split(" ").map(Number));

function solution() {
  arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  let nowEndTime = 0;
  let answer = 0;
  for (let i = 0; i < n; i++) {
    if (nowEndTime <= arr[i][0]) {
      nowEndTime = arr[i][1];
      answer += 1;
    }
  }

  console.log(answer);
}

solution();
