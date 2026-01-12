const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = input.slice(1).map((e) => e.split(" ").map(Number));

//문제
/**바이러스 m개, 연구소 n*n
 * 빈칸 = 0, 벽 = 1, 바이러스를 놓을 수 있는 칸 = 2
 * 퍼지는데 최소 시간 확인
 *
 * 2인 곳 좌표 중 m 개 골라서 퍼뜨리기 로직 실행
 * 다 퍼지는데 몇초걸리는지 확인
 * 0. 세팅
 *    1. 바이러스 가능한 위치 좌표 배열 m
 *    2. board
 *    3. minValue
 *
 * 1. 좌표 선택 로직
 *    조합 중복x [0,1,2]
 *    기본 좌표 얻어서
 *
 * 2. 바이러스 퍼짐 로직
 *     bfs visited return
 *
 * 3. 최소 시간 확인 로직 (visited 확인)
 *    빈칸 체크는 board랑 visited 같이 체크해서 0이고 1 이면 -1
 *
 **/

//풀이

let selectArr = [];
let virusCoords = [];
let minTime = Infinity;
const [dx, dy] = [
  [-1, 1, 0, 0],
  [0, 0, -1, 1],
];

function inRange(x, y) {
  return 0 <= x && x < n && 0 <= y && y < n;
}

function selectCoord(depth, start) {
  if (depth === m) {
    //여기서 퍼짐 로직 실행
    const virusBoard = bfs(selectArr);
    getMinTime(virusBoard);

    return;
  }

  for (let i = start; i < virusCoords.length; i++) {
    selectArr.push(i);
    selectCoord(depth + 1, i + 1);
    selectArr.pop();
  }
}

function makeCopyBoard(selectArr) {
  let copyBoard = Array(n)
    .fill(0)
    .map((_) => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 1) {
        copyBoard[i][j] = 1;
      }
    }
  }

  selectArr.forEach((n) => {
    const [x, y] = virusCoords[n];
    copyBoard[x][y] = 2;
  });

  return copyBoard;
}

function bfs(selectArr) {
  let queue = [];
  let visited = Array(n)
    .fill(0)
    .map((_) => Array(n).fill(0));
  copyBoard = makeCopyBoard(selectArr);

  for (let i = 0; i < selectArr.length; i++) {
    queue.push(virusCoords[selectArr[i]]);
  }

  let head = 0;
  while (head < queue.length) {
    const [x, y] = queue[head++];

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];
      if (!inRange(nx, ny)) continue;
      if (copyBoard[nx][ny] === 0 && visited[nx][ny] === 0) {
        visited[nx][ny] = visited[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  return visited;
}

function getMinTime(visited) {
  let maxValue = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j] === 0 && copyBoard[i][j] === 0) return;
      if (copyBoard[i][j] === 0) {
        maxValue = Math.max(maxValue, visited[i][j]);
      }
    }
  }

  minTime = Math.min(maxValue, minTime);
}

function solution() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 2) {
        virusCoords.push([i, j]);
      }
    }
  }

  selectCoord(0, 0);

  minTime = minTime === Infinity ? -1 : minTime;
  console.log(minTime);
}

solution();
