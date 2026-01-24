const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [R, C, T] = input[0].split(" ").map(Number);
let house = input.slice(1).map((e) => e.split(" ").map(Number));
let airCleanerRow = [];
//문제
//집 크기 = r,c (6~50)
//house[r][c]의 value를 모니터링
//공기 청정기 1번열에 설치 2행 차지 (-1로 주어짐),
//공기 청정기가 1초동안 돌아가는 로직을 T초동안 돌린 뒤 방에 남아있는 미세먼지의 양을 구해라

//새로운 house 만들기(0으로 새 배열만들어서 사용)
//한 time에
//미세먼지 확산로직 작동 후 공기청정기 작동
//1. 미세먼지 확산
//인접한 4방향으로 확산
//동시에 일어남으로 따로 배열을 사용해서 결과값만 붙여넣기
//인접한 방향에 공청기가 있거나, 칸이 없으면 확산 x
//확산되는 양 = [r,c]/5, 소수점 버림
//마지막으로 r,c의 미세먼지 양은 Ar/c - [r,c/5] * 확산된 방향 개수
//2. 공기청정기 작동
//바람이 나옴
// 위쪽은 반시계방향, 아래쪽은 시계방향으로 순환
// 미세먼지는 바람의 방향대로 모두 한칸씩 이동
// 공기청정기로 밈세먼지가 들어가면 없어짐
// 다 끝난뒤
// 새로운 house 기존 house에 적용

//공기청정기 로직
//const [upDx,upDy] = [[0,-1,0,1],[1,0,-1,0]]
//const [downDx, downDy] = [[0,1,0,-1],[1,0,-1,0]]
//inRange가 false면 방향 전환, 다시 공기청정기로 돌아오면 정지
//현재칸 value담은뒤 0으로 만들고 다음칸 도착하면 value
//after = value => value = before
//이때 공청기 만나면 로직 종료하니까 알아서 사라짐
//위 아래 두개로 나눠서 while문
//after, before 초기값 0

//주의 사항
//새로운 house 만들때 0으로 초기화 해서 만들고 미세먼지 탐색은 기존 house에서 탐색, 결과는 새로운 house에 저장
//미세먼지 확산은 동시에
//똑같은 곳으로 확산시 + 연산

//2차원 배열로 구성
//확산은 그냥 2중for문

//바뀌는거
//house의 미세먼지의 값, 위치, 존재유무

//안바뀌는거
//house의 크기
//공기청정기의 위치 및 순회 방향

//함수
//미세먼지 확산 함수
//req = 현재 좌표, 진행중인 새로운 house 배열
//response = 확산된 house 배열

function inRange(x, y) {
  return 0 <= x && x < R && 0 <= y && y < C;
}
function spread() {
  let newHouse = Array(R)
    .fill(0)
    .map(() => Array(C).fill(0));
  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (house[i][j] > 0) {
        let canSpread = 0;
        for (let k = 0; k < 4; k++) {
          const [nx, ny] = [i + dx[k], j + dy[k]];
          if (!inRange(nx, ny)) continue;
          if (house[nx][ny] === -1) continue;
          canSpread++;
          newHouse[nx][ny] += Math.floor(house[i][j] / 5);
        }
        newHouse[i][j] += house[i][j] - Math.floor(house[i][j] / 5) * canSpread;
      }
    }
  }

  newHouse[airCleanerRow[0]][0] = -1;
  newHouse[airCleanerRow[1]][0] = -1;

  return newHouse;
}

function clean() {
  let newHouse = house.map((row) => [...row]);

  const upX = airCleanerRow[0];
  const downX = airCleanerRow[1];

  function upClean() {
    for (let i = 2; i < C; i++) {
      newHouse[upX][i] = house[upX][i - 1];
    }
    for (let i = upX; i > 0; i--) {
      newHouse[i - 1][C - 1] = house[i][C - 1];
    }
    for (let i = C - 1; i > 0; i--) {
      newHouse[0][i - 1] = house[0][i];
    }
    for (let i = 1; i < upX; i++) {
      newHouse[i][0] = house[i - 1][0];
    }
  }

  function downClean() {
    for (let i = 2; i < C; i++) {
      newHouse[downX][i] = house[downX][i - 1];
    }
    for (let i = downX; i < R - 1; i++) {
      newHouse[i + 1][C - 1] = house[i][C - 1];
    }
    for (let i = C - 1; i > 0; i--) {
      newHouse[R - 1][i - 1] = house[R - 1][i];
    }
    for (let i = R - 1; i > downX; i--) {
      newHouse[i - 1][0] = house[i][0];
    }
  }

  upClean();
  downClean();

  newHouse[upX][0] = -1;
  newHouse[downX][0] = -1;
  newHouse[upX][1] = 0;
  newHouse[downX][1] = 0;
  return newHouse;
}

function solution() {
  let answer = 0;

  for (let i = 0; i < R; i++) {
    if (house[i][0] === -1) {
      airCleanerRow.push(i);
    }
  }

  for (let t = 0; t < T; t++) {
    house = spread();
    house = clean();
  }

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (house[i][j] > 0) {
        answer += house[i][j];
      }
    }
  }

  console.log(answer);
}

solution();
