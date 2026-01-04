const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = Number(input[0]);
const teamValue = input.slice(1).map((e) => e.split(" ").map(Number));
const team = Array(n).fill(0);
let select = [];
let diff = Infinity;
//조합은 어떤식으로?
//만약 6명일 경우 3개만 뽑음
//음 중복 없은 조합으로
//start 넘기기
//start = i+1

// 조합 구한뒤 안뽑힌 나머지 수 구하고
// 두개 배열 a = [], b=[] 에서 각각의 배열을 2중 for문으로 돌려 각 팀의 value를 구함

function comb(depth, start) {
  if (depth === Math.floor(n / 2)) {
    const [teamA, teamB] = teamBuild(select);
    checkDiff(teamA, teamB);
    return;
  }

  for (let i = start; i < n; i++) {
    select.push(i);
    comb(depth + 1, i + 1);
    select.pop();
  }
}

function teamBuild(select) {
  let teamA = select;
  let teamB = [];
  for (let i = 0; i < n; i++) {
    if (!teamA.includes(i)) {
      teamB.push(i);
    }
  }

  return [teamA, teamB];
}

function checkDiff(teamA, teamB) {
  let teamAValue = 0;
  let teamBValue = 0;

  for (let i = 0; i < n / 2; i++) {
    for (let j = 0; j < n / 2; j++) {
      if (i === j) continue;
      teamAValue += teamValue[teamA[i]][teamA[j]];
      teamBValue += teamValue[teamB[i]][teamB[j]];
    }
  }

  diff = Math.min(diff, Math.abs(teamAValue - teamBValue));
}
function solution() {
  comb(0, 0);

  console.log(diff);
}

solution();
