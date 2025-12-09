const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, w, L] = input[0].split(" ").map(Number);
let trucks = input[1].split(" ").map(Number);

//내 풀이
//bridge에 조건에 부합하는 트럭들을 올림,
//bridge에 올라가 있는 트럭들의 cnt를 +1씩 해 이동한것을 표현
//그후 bridge를 넘어선 트럭들은 bridge에서 제거

function solution() {
  let bridge = [];
  let answer = 0;
  let nowWeight = 0;
  let finish = [];
  while (finish.length !== n) {
    answer += 1;
    nowWeight = 0;
    let finishTrucks = [];
    bridge.forEach((truck, idx) => {
      truck[1] += 1;
      if (truck[1] > w) {
        finishTrucks.push(idx);
      } else {
        nowWeight += truck[0];
      }
    });

    if (finishTrucks.length > 0) {
      finishTrucks.forEach((trucksIdx) => {
        finish.push(bridge.splice(trucksIdx, 1));
      });
    }

    if (nowWeight + trucks[0] <= L && bridge.length < w) {
      bridge.push([trucks.shift(), 1]);
    }
  }

  console.log(answer);
}

solution();

//직접 bridge를 움직이며 계산
//shift로 빼고 push로 0을 집어넣으며 레일처럼 구성

function solution2() {
  let bridge = Array(w).fill(0).map(Number);
  let sum = 0;
  let finish = 0;
  let time = 0;

  while (trucks.length > 0 || sum > 0) {
    finish = bridge.shift();
    bridge.push(0);
    sum -= finish;
    time++;

    if (bridge[w - 1] === 0 && sum + trucks[0] <= L) {
      sum += trucks[0];
      bridge[w - 1] = trucks.shift();
    }
  }

  console.log(time);
}

solution2();
