const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

// const [N, R, C] = input;
// let ans = 0;

// function dfs(n, r, c) {
//   if (n === 0) {
//     console.log(ans);
//     return;
//   }

//   const [x, y] = [2 ** (n - 1), 2 ** (n - 1)];
//   const half = 2 ** (n - 1);
//   const size = half * half;
//   //중앙 값이 0,0이 아니라 왼쪽 위 상단이 0,0임
//   if (r < x && c < y) {
//   } else if (r < x && c >= y) {
//     ans += size;
//     c -= y;
//   } else if (r >= x && c < y) {
//     ans += size * 2;
//     r -= x;
//   } else if (r >= x && c >= y) {
//     ans += size * 3;
//     r -= x;
//     c -= y;
//   }

//   dfs(n - 1, r, c);
// }

// dfs(N, R, C);

//두번쨰 풀이
//top down 방식
//가장 큰 사각형에서 n을 하나씩 줄여가며 r,c 위치를 확인해 그 위치의 value를 더해나가 n이 0일때는 원했던 target의 위치의 value를 return하는식
//1. r,c 위치 판단 (현재 시점에서의 r, c 위치를 판단해야함)
// 그러므로 r,c의 위치는 몇 사분면에 있냐에 따라 상대적으로 변경해야됨 하지만 이 풀이에서는 %을 사용함으로써 각 사분면의 상대적 변경을 한꺼번에 처리함
// %을 사용하면 그 보다 넘치는 수들을 덜어내기 때문에 각각 분면에 맞는 값을 도출해 낼 수 있게 됨
// 1 = 0리턴 2 = 1, 3 = 2, 4 = 3
//2. r,c 위치에 따른 value 설정
//ans + return 값 * half ** 2

// let [N, r, c] = input;
// function findSection(half, row, col) {
//   if (row < half && col < half) return 0;
//   if (row < half && col >= half) return 1;
//   if (row >= half && col < half) return 2;
//   if (row >= half && col >= half) return 3;
// }

// function solution() {
//   let ans = 0;

//   for (let i = N; i > 0; i--) {
//     const half = 2 ** (i - 1);
//     ans += findSection(half, r, c) * half ** 2;
//     r %= half;
//     c %= half;
//   }

//   return ans;
// }

// console.log(solution());

//재풀이

//r , c 자체는 상대적으로 계속해서 줄인다
//값은 n사분면 이냐에 따라 half*half*n-1 해서 더한다
//중요한 점은 상대적으로 줄인다는점, 맨첫 단계에서 바로 정확한 좌표값을 구하려고 하는게 아니라 최종적으로의 좌표값을 위해 계속해서 해당 지점에서의 좌표값을 줄여 나간다는 점 이다.
const [N, R, C] = input;
let ans = 0;

function solution() {
  dfs(N, R, C);
}

function getSection(half, r, c) {
  //= 을 지정할때는 [0,1,2,3]인 크기의 한변을 가지고 있을 때 half는 2, 2는 2사분면이여야 하기 때문에 2사분면에 =이 달림, 3,4분면도 똑같은 로직
  if (r < half && c < half) return 0;
  if (r < half && c >= half) return 1;
  if (r >= half && c < half) return 2;
  if (r >= half && c >= half) return 3;
}

function dfs(n, r, c) {
  if (n === 0) {
    console.log(ans);
    return;
  }
  let half = 2 ** (n - 1);
  ans += half ** 2 * getSection(half, r, c);
  dfs(n - 1, r % half, c % half);
}

solution();
