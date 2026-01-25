const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, L] = input[0].split(" ").map(Number);
let board = input.slice(1).map((e) => e.split(" ").map((e) => [Number(e), 0]));
let answer = 0;
//문제
//지도에서 지나갈 수 있는 길 몇개인지 세기
// r로 한개 c으로 한개
//끝에서 끝까지
//지나갈 수 있는 길 = 해당 길에 속한 모든 칸의 높이가 모두 같음
// 깎는건 안됨 만약 깎으면 다시 내려가야 하는 경우에 대해서 경사로를 안놔도 통과 가능
//경사로를 놔서 낮은칸, 높은칸 연결 가능

//바뀌는거
//맵의 경사로 유무
//지나갈 수 있는 길 갯수

//안바뀌는거
//맵 크기
//경사로 길이

// 주의 사항
// 만약 이미 경사로가 지어져 있는 경우 안지었을 경우에 대해서는 체크할 필요 없음
// 어짜피 해당 경사로를 지우고 다른 경로에 지었을 경우 지나갈 수 있는 길은 똑같이 1개로 카운트 되기 때문에
// 굳이 먼저 지어진거에 대해서 케이스를 나눌 필요 없음

//로직

//0. col이랑 row 랑 line 만드는 로직이 다르기 때문에 분리해서 로직을 구현한다

//가로줄 먼저 -> 세로줄
//1. check(line) : boolean
//이 로직은 해당 배열을 받아서 지을 수 있을지 없을지를 확인하는 로직이다.
//diff = 현재 - 앞(++) //높이차
//abs(diff) > 1 이면 false
//높이차가 1이고
//높이 차이가 -면 내리막, +면 오르막
//inRange()
//앞이 내리막이면 앞으로 l칸이 diff이 1 && 원래 board에 경사로가 없어야됨
//앞이 오르막이면 뒤로 l-1칸이 diff이 1 && 원래 board에 경사로가 없어야됨
//충족 못할시 return false
//

// true면 가능한 경사로 갯수를 ++ 하고 경사로를 짓는다
//2. build(line) : newLine
//경사로를 지은 라인을 return 한다
//3. 적용
//원래 board에 newLine을 적용한다.

//위 로직에서 틀린점
//가로랑 세로는 다른 레이어라 경사로가 서로 간섭을 안한다
//당연히 간섭 할줄 알고 결과 값을 board에 붙여넣기 했었는데 이렇게 하니까 틀리다고 나옴
function canBuild(line, newLine, i, j, type) {
  if (type === "downhill") {
    if (
      i + j < N &&
      line[i][0] - line[i + j][0] === 1 &&
      newLine[i + j][1] !== 1
    ) {
      return true;
    }
  } else if (type === "uphill") {
    if (
      i - j >= 0 &&
      line[i - j][0] - line[i + 1][0] === -1 &&
      newLine[i - j][1] !== 1
    ) {
      return true;
    }
  }

  return false;
}
function check(line) {
  let newLine = [];
  line.forEach((l) => {
    newLine.push([...l]);
  });

  for (let i = 0; i < N - 1; i++) {
    const diff = line[i][0] - line[i + 1][0];
    if (Math.abs(diff) > 1) return false;

    if (diff === 1) {
      //i+1 기준 내리막
      for (let j = 1; j < L + 1; j++) {
        if (!canBuild(line, newLine, i, j, "downhill")) {
          return false;
        }
        newLine[i + j][1] = 1;
      }
    } else if (diff === -1) {
      //i+1 기준 오르막
      for (let j = 0; j < L; j++) {
        if (!canBuild(line, newLine, i, j, "uphill")) {
          return false;
        }
        newLine[i - j][1] = 1;
      }
    }
  }

  return true;
}

function solution() {
  for (let i = 0; i < N; i++) {
    if (check(board[i])) answer++;
  }

  for (let i = 0; i < N; i++) {
    let colLine = [];
    for (let j = 0; j < N; j++) {
      colLine.push(board[j][i]);
    }
    if (check(colLine)) answer++;
  }

  console.log(answer);
}
solution();
