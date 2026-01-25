//문제
//길이가 N인 컨베이어 벨트
//2N인 컨베이어 벨트
//한칸씩 움지기면서 로봇을 이동하고 로봇을 올리는데 내구도가 0인칸에 k개 면 멈추고아니면 이게 몇번 반복됐는지 출력

//변하는거
//로봇 갯수, 로봇 위치, 벨트 위치, 벨트 내구도

//안변하는거
//벨트 길이
//회전 방향

//주의사항
// 벨트 내구도는 로봇이 위치했을때만 1 감소
// 다른 케이스는 없음
// 한턴에 한번씩 무조건 -1 되는거 아님
// 로봇이 내리는 위치에 도달하면 로봇 움직이기전에 바로 내림(0으로 초기화)

//구현
//1. 벨트 돌리기 (로봇과 함께)
//배열 [[내구도, 로봇 유무], ...] 이 상태인것을 한칸씩 이동 오른쪽으로 이건 실제로 옮기는것 보다
//상차, 하차 인덱스 사용해서 최적화
//그냥 unshift로 넣고 pop으로 제거해서 돌려
//
//2. 벨트 위 로봇 움직이기
// - N부터 1까지 (가장 먼저 올라간 로봇부터)
// - 로봇 있으면 이동로직
// - 다음칸 = [로봇 없고,내구도 1 이상]
// - 옮기고 내구도 -1 , 로봇있음 표시
//
//3. 로봇 올리기
// - 내구도 0 아니면 올리고 내구도 -1

//4. 내구도 0인칸 K개 이상 되면 종료
//1.for문 돌려서 0칸 갯수 체크
//2. -1 칠때 확인
const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map((e) => [Number(e), 0]);

function spin() {
  const last = arr.pop();
  arr.unshift(last);

  if (arr[N - 1][1] === 1) {
    arr[N - 1][1] = 0;
  }
}

function moveRobot() {
  for (let i = N - 2; i >= 0; i--) {
    if (arr[i][1] === 1 && arr[i + 1][1] === 0 && arr[i + 1][0] > 0) {
      arr[i][1] = 0;
      arr[i + 1][1] = 1;
      arr[i + 1][0] -= 1;
    }
  }

  if (arr[N - 1][1] === 1) {
    arr[N - 1][1] = 0;
  }
}

function putRobot() {
  if (arr[0][0] > 0 && arr[0][1] === 0) {
    arr[0][1] = 1;
    arr[0][0] -= 1;
  }
}

function check() {
  let cnt = 0;
  for (let i = 0; i < N * 2; i++) {
    if (arr[i][0] === 0) {
      cnt += 1;
    }

    if (cnt >= K) return false;
  }

  return true;
}

function solution() {
  let time = 0;
  while (check()) {
    time++;
    spin();
    moveRobot();
    putRobot();
  }

  console.log(time);
}

solution();
