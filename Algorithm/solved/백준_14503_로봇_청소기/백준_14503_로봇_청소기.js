const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const [r, c, d] = input[1].split(" ").map(Number);
const board = input.slice(2).map((e) => e.split(" ").map(Number));
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let answer = 0;

// 풀이 1
// while 문을 사용해서 각각의 조건을 함수로 만들어 확인한 뒤 진행
// 1. 현재칸 === 0 이면 청소
// 2. 4방향 체크 -> 갈곳 x -> 후진 o -> 후진 후 1번으로(방향 전환 x)
//                      -> 후진 x -> 종료
//             -> 갈곳 o -> 반시계 방향으로 돌리며 가장 만저 갈 수 있는 곳으로 이동

// let dir = d;
// let canCleanPosCnt = 0;
// let flag = true;

// function move() {
//   let [x, y] = [r, c];
//   while (canCleanPosCnt > answer && flag) {
//     if (board[x][y] === 0) {
//       answer += 1;
//       board[x][y] = 2;
//     }
//     if (canMove(x, y)) {
//       spinDir(x, y);
//       [x, y] = [x + dx[dir], y + dy[dir]];
//       continue;
//     } else {
//       if (canBack(x, y)) {
//         [x, y] = [x - dx[dir], y - dy[dir]];
//         continue;
//       } else {
//         flag = false;
//         break;
//       }
//     }
//   }
// }

// function canMove(x, y) {
//   for (let i = 0; i < 4; i++) {
//     const [nx, ny] = [x + dx[i], y + dy[i]];
//     if (inRange(nx, ny) && board[nx][ny] === 0) {
//       return true;
//     }
//   }
//   return false;
// }

// function spinDir(x, y) {
//   for (let i = 0; i < 4; i++) {
//     dir -= 1;
//     dir = dir < 0 ? 3 : dir;
//     const [nx, ny] = [x + dx[dir], y + dy[dir]];
//     if (inRange(nx, ny) && board[nx][ny] === 0) {
//       return;
//     }
//   }
// }

// function canBack(x, y) {
//   const backDir = (dir + 2) % 4;
//   const [nx, ny] = [x + dx[backDir], y + dy[backDir]];
//   if (inRange(nx, ny) && board[nx][ny] !== 1) {
//     return true;
//   }
//   return false;
// }

// function inRange(x, y) {
//   return 0 <= x && x < n && 0 <= y && y < m;
// }

// function solution() {
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (board[i][j] === 0) {
//         canCleanPosCnt += 1;
//       }
//     }
//   }

//   move();

//   console.log(answer);
// }

// solution();

//풀이 2
//bfs를 사용해 que에 들어가는 한 노드는 각기 다른 케이스에 대한 진행값
//bfs 사용 각 노드에 대해 조건 확인
//node = [x,y,dir]
// 노드 뽑고 해당 자리 0이면 answer +=1 , 칠하기
// 반시계 방향 으로 체크하며 갈 수 있으면 해당 방향으로 진행 한 좌표값 넣은 큐 삽입 후 break
// 갈곳 없고 후진되면 후진한 node 삽입
// 후진 안되면 삽입 안하고 그냥 끝

function bfs() {
  let que = [];
  que.push([r, c, d]);

  while (que.length > 0) {
    const [x, y, dir] = que.shift();
    let flag = true;
    if (board[x][y] === 0) {
      board[x][y] = 2;
      answer += 1;
    }

    for (let i = 1; i < 5; i++) {
      const nd = (dir - i + 4) % 4;
      const [nx, ny] = [x + dx[nd], y + dy[nd]];
      if (inRange(nx, ny) && board[nx][ny] === 0) {
        que.push([nx, ny, nd]);
        flag = false;
        break;
      }
    }

    if (flag) {
      const [nx, ny] = [x - dx[dir], y - dy[dir]];
      if (board[nx][ny] !== 1) {
        que.push([nx, ny, dir]);
      }
    }
  }
}

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < m;
}
function solution() {
  bfs();
  console.log(answer);
}

solution();
