const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const rule = input.slice(1, N + 1).map((e) => e.split(" ").map(Number));
const ghAction = input[input.length - 2].split(" ").map((e) => Number(e) - 1);
const mhAction = input[input.length - 1].split(" ").map((e) => Number(e) - 1);

//문제
//가위바위보 우승자 구하기 (지우가 모든 손동작을 다르게 해서 우승 할 수 있는가?)

//a b c 진행일때
//a - b 무승부일시 b 승리
//다음턴
//승자 - 참여 안한사람
//특정 사람이 미리 합의된 승수를 달성할 때까지 3 반복
//합의된 승수를 최초로 달성한 사람이 우승

//순열 (중복 x)1~N중 한개씩 20개 뽑은 순열
//해당 순열대로 경기를 진행
//지우 -> 경희 -> 민호 순
//각각의 승수 체크

//로직
//0. 지우가 낼 가위바위보 순열로 뽑기
//1. game(지우 action) : boolean (받아서 flag에 넣고 flag===true면 순열 동작 정지)
//누군가 k 승 할때 까지 진행
//game 로직
//각각의 round를 가져야함
//round = [0,0,0]
//win 이랑 next랑 number로 구분
//win lose next //기본세팅
//0   2    1
// win 이랑 next랑 대결, round에 대한 값으로 a[round[win]][round[next]] 해서
// 이기는지 지는지 비기는지 확인
//이긴사람  win 으로,
//새 배열 만들어서
//이긴사랑 win 기존 진사람 next, 이번에 진사람 lose로 변경
//round++

let jwAction = [];
let visited = Array(N + 1).fill(false);
let flag = false;

function playGame(select) {
  const player = [[...select], [...ghAction], [...mhAction]];
  let round = [0, 0, 0]; //-1씩 0일때 까지
  let winCnt = [0, 0, 0];
  let [winner, loser, next] = [0, 2, 1];
  let [nextWinner, nextLoser, nextNext] = [0, 0, 0];
  while (!winCnt.includes(K) && round[0] < select.length) {
    const result =
      rule[player[winner][round[winner]]][player[next][round[next]]];

    if (result === 2) {
      nextWinner = winner;
      nextLoser = next;
      nextNext = loser;
    } else if (result === 1) {
      nextWinner = winner > next ? winner : next;
      nextLoser = winner > next ? next : winner;
      nextNext = loser;
    } else if (result === 0) {
      nextWinner = next;
      nextLoser = winner;
      nextNext = loser;
    }

    round[nextWinner]++;
    round[nextLoser]++;
    winCnt[nextWinner]++;
    [winner, loser, next] = [nextWinner, nextLoser, nextNext];
  }

  if (winCnt.findIndex((e) => e === K) === 0) {
    return true;
  }
  return false;
}

function getPattern(depth) {
  if (flag) return;
  if (depth === N) {
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      jwAction.push(i);
      visited[i] = true;
      if (jwAction.length >= K && playGame(jwAction)) {
        flag = true;
        return;
      }
      getPattern(depth + 1);
      visited[i] = false;
      jwAction.pop();
    }
  }
}

function solution() {
  if (N < K) {
    console.log(0);
    return;
  }

  getPattern(0);

  if (flag) {
    console.log(1);
  } else {
    console.log(0);
  }
}

solution();
