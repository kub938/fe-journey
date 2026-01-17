const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, L, R] = input[0].split(" ").map(Number);
const board = input.slice(1).map((e) => e.split(" ").map(Number));

//2차원 배열
//상하좌우의 차이가 L이상 R이하면 국경선을 연다
//열리면 인구 이동
//이동 가능하면 연합 => 인구수 = 연합끼리 싹다 더한값 / 연합 칸 갯수 , 소수점은 버림
// 연합 해쳋 및 국경선 닫기

//선의 상태는?
// 2차원 배열로 구현 [[0,0,0,0],[0,0,0,0]], 우,하 만 체크
// 0번인덱스는 0,1과의 상태
// 1번은

// 오른쪽 , 아래확인해서 체크
//
const [dx, dy] = [
  [-1, 1, 0, 0],
  [0, 0, -1, 1],
];

function solution() {
  let answer = 0;
  while (true) {
    let flag = false;
    let check = Array(n)
      .fill(0)
      .map((_) => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (check[i][j] === 0) {
          if (bfs(i, j, check)) {
            flag = true;
          }
        }
      }
    }

    if (!flag) break;

    answer++;
  }

  console.log(answer);
}

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < n;
}

function bfs(i, j, check) {
  let flag = false;
  let queue = [[i, j]];
  let sumValue = 0;
  let head = 0;
  let countCountry = 0;
  check[i][j] = 1;

  while (head < queue.length) {
    const [x, y] = queue[head++];
    const nowCountry = board[x][y];
    sumValue += nowCountry;
    countCountry++;

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];
      if (!inRange(nx, ny)) continue;

      const diff = Math.abs(nowCountry - board[nx][ny]);
      if (L <= diff && diff <= R && check[nx][ny] === 0) {
        queue.push([nx, ny]);
        check[nx][ny] = 1;
        flag = true;
      }
    }
  }

  const peopleAvg = Math.floor(sumValue / countCountry);

  queue.forEach(([x, y]) => {
    board[x][y] = peopleAvg;
  });

  return flag;
}

solution();
