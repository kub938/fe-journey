const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, D] = input[0].split(" ").map(Number);
const board = input.slice(1).map((e) => e.split(" ").map(Number));

//문제 정의
// 각 칸의 적의수는 최대 1
// N+1번행은 성
// 궁수 3명 배치
// 성이 있는칸에 배치
//하나의 칸에는 최대 1명의 궁수
// 각각의 턴마다 궁수는 적 하나를 공격
// 궁수들은 동시에 공격 ( 한턴 )
//

// 공격 우선순위
// 거리가 D이하인 적중 가장 가까운 적 => 거리가 같으면 가장 왼쪽인 적
// 공격받은 적은 게임에서 제외 (공격이 다 끝난 뒤 처리)
// 공격 받은 적 처리 후, 나머지 적 한칸 아래로 move
// 성이 있는칸으로 이동한 경우 게임에서 제외
// 모든 적이 제외되면 게임이 끝남

// 이때 궁수의 position에 따라 공격으로 제거할 수 있는 적이 달라질텐데
// 이때 제거할 수 있는 최대 값을 구해보자

//

//변수
//board = N*M
//distance = |r1-r2| + |c1-c2|
//궁수 위치, 적 위치
//위치는 어떤식으로?
//각각의 위치 배열로 동작
// 15*15

//2차원 배열에다 하면 정렬 로직이 따로 필요 없고
//따로 궁수 적 모아놓으면 배열이 필요 없고
// 그냥 2차원 배열이 맞다

//적칸 , 궁수칸

//거리 기준 오름차순 정렬, 거리가 같으면 적칸에서 col 기준 오름차순 정렬
//구조로 보장
//d = 0 ~ 10까지 진행
//row는 n-1 ~ 0까지
//col은 0~m까지 진행
//이때 row col이 1 이고 계산한 거리 값이 d와 같으면 killCnt += 1 하고
//좌표값 push 해놨다가 한턴 끝나면 0으로 바꿈
//그 후 이동
//이동할때 N 넘으면 그냥 0으로 변경
//그후 n*m 돌려서 1 있나 확인
//없으면 중단하고 다음 조합으로 넘어감
//

//archer = [] //조합으로 3개 고르기
//enemy = [] //입력값에서 수집

//바뀌는거
//궁수 위치(3명) 바꾸고 게임 시작
//몇턴? 적이 없을때 까지
//한턴마다 바뀌는거
//한턴 == 궁수 3명이 동시 공격
//공격에 의한 적 사망 (사망한 적 deadEnemy에 push)
//3명 공격 끝나고 사망 처리
//후 남아있는 적 위치 아래로 한칸 이동

//지켜져야 하는거
//격자판 크기

//종료 조건
// 적이 없으면 종료

//로직
//궁수 좌표설정
//게임 시작
//궁수 공격
//적 죽음 처리
//적 이동
//이동 후 사라짐 처리
//반복(적이 없을때 까지)

//자료구조
//배열
let select = [];
let maxKillCnt = 0;

function allKillCheck(newBoard) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (newBoard[i][j] === 1) {
        return false;
      }
    }
  }
  return true;
}
function gameLogic(archerPos) {
  let newBoard = [];

  board.forEach((e) => {
    newBoard.push([...e]);
  });

  //   archerPos.forEach((pos) => {
  //     newBoard[N][pos] = 2;
  //   });

  let killCnt = 0;
  while (true) {
    if (allKillCheck(newBoard)) break;
    let killPos = [];

    archerPos.forEach((pos) => {
      for (let d = 1; d <= D; d++) {
        for (let j = 0; j < M; j++) {
          for (let i = N - 1; i >= 0; i--) {
            if (newBoard[i][j] !== 1) continue;
            if (Math.abs(N - i) + Math.abs(pos - j) === d) {
              killPos.push([i, j]);
              return;
            }
          }
        }
      }
    });

    killPos.forEach((pos) => {
      if (newBoard[pos[0]][pos[1]] === 0) {
        return;
      }
      newBoard[pos[0]][pos[1]] = 0;
      killCnt += 1;
    });

    let moveEnemy = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (newBoard[i][j] === 1) {
          if (i === N - 1) {
            newBoard[i][j] = 0;
            continue;
          }

          newBoard[i][j] = 0;
          moveEnemy.push([i + 1, j]);
        }
      }
    }

    moveEnemy.forEach((pos) => {
      newBoard[pos[0]][pos[1]] = 1;
    });
  }

  return killCnt;
}

function selectArcherPos(depth, start) {
  if (depth === 3) {
    maxKillCnt = Math.max(maxKillCnt, gameLogic(select));
    return;
  }

  for (let i = start; i < M; i++) {
    select.push(i);
    selectArcherPos(depth + 1, i + 1);
    select.pop();
  }
}

function solution() {
  selectArcherPos(0, 0);

  console.log(maxKillCnt);
}

solution();
