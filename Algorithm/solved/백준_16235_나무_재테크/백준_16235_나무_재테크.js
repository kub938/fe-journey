// const fs = require("fs");
// const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
// const input = fs.readFileSync(filePath).toString().trim().split("\n");
// const [N, M, K] = input[0].split(" ").map(Number);

// const arr = input.slice(1, N + 1).map((e) => e.split(" ").map(Number));
// let treesInfo = input.slice(N + 1).map((e) => e.split(" ").map(Number));
// let energy = Array(N)
//   .fill(0)
//   .map((_) => Array(N).fill(5));

// treesInfo.sort((a, b) => b[2] - a[2]);
// treesInfo = treesInfo.map((e) => [e[0] - 1, e[1] - 1, e[2]]);
// //board 초기값 5
// //treeInfo 심고 근데 같은 좌표에 여러개 심을 수 있음
// //봄 여름 가을 겨울 로직 다름
// //1년에 봄 여름 가을 겨울 * k번 반복 한뒤
// //나무의 갯수 확인

// //1번 tree심기 (같은곳 1개 이상 가능)
// //
// //tree 죽은처리는 위에서?
// function spring() {
//   //나이만큼 양분 먹음 (idx 2) 양분 부족시 즉시 사망
//   //확인후 먹는걸로
//   // 나이가 어린 나무부터 양분을 먹음 => 양분이 적은 순서대로 정렬
//   const treesLength = treesInfo.length;
//   for (let i = treesLength - 1; i >= 0; i--) {
//     const [x, y, old] = treesInfo[i];

//     if (energy[x][y] - old < 0) {
//       treesInfo[i][2] = -1 * Math.floor(treesInfo[i][2] / 2);
//     } else {
//       energy[x][y] -= old;
//       treesInfo[i][2] += 1;
//     }
//   }

//   treesInfo = treesInfo.filter((e) => {
//     if (e[2] > 0) {
//       return true;
//     } else {
//       energy[e[0]][e[1]] += -1 * e[2];
//       return false;
//     }
//   });
// }

// function fall() {
//   //나무 번식
//   //나무가 나이가 5의 배수일 경우
//   //인접 8칸에 나이가 1인 나무가 생김 (광역기네)
//   //inRange 필요

//   for (let i = 0; i < treesInfo.length; i++) {
//     const [x, y, old] = treesInfo[i];
//     if (old % 5 === 0) {
//       const [dx, dy] = [
//         [-1, -1, 0, 1, 1, 1, 0, -1],
//         [0, 1, 1, 1, 0, -1, -1, -1],
//       ];
//       for (let j = 0; j < 8; j++) {
//         const [nx, ny] = [x + dx[j], y + dy[j]];
//         if (!inRange(nx, ny)) continue;
//         treesInfo.push([nx, ny, 1]);
//       }
//     }
//   }
// }

// function winter() {
//   //board에 모두 양분추가 각칸에 추가되는 양분은 원래 arr에 있는만큼
//   for (let i = 0; i < N; i++) {
//     for (let j = 0; j < N; j++) {
//       energy[i][j] += arr[i][j];
//     }
//   }
// }

// function inRange(x, y) {
//   return 0 <= x && x < N && 0 <= y && y < N;
// }
// function solution() {
//   let answer = 0;

//   for (let i = 0; i < K; i++) {
//     spring();
//     fall();
//     winter();
//   }

//   answer = treesInfo.length;

//   console.log(answer);
// }

// solution();

//treesInfo 를 초반에 그냥 list로 모든 tree를 넣어서 보관 한 뒤
//sort를 통해서 spring 마다 정렬하는 로직이였는데 이게 시간복잡도가 터졌다
//당연히 2차원 배열을 돌려서 n*n을 돌리는것보다 list를 생성하는게 빠를줄 알았는데
//이 문제의 경우 2차원 배열이 n*n을 돌리는게 더 빠른 경우였다...

// 풀이 2번 통과

const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map((e) => e.split(" ").map(Number));

let board = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => []),
);

let energy = Array(N)
  .fill(0)
  .map((_) => Array(N).fill(5));

// n*n 땅 r,c는 1부터
// r,c = -1씩 해서 사용
// energy 초기값 5만큼 n*n으로 초기화
// m개 나무 나무가 한칸에 여러개 가능
// 각 칸의 나무는 나이기준 내림차순 정렬

// 봄 여름 가을 겨울 로직

// 봄에는 내림차순 정렬이니까 맨 뒤에서부터 확인
// 봄 + 여름로직
// energy[나무][좌표] - 나무 나이 < 0 이면 그 나무는 죽는다, 죽으면 바로 나이 / 2 한 값을 energy좌표에 추가 + pop()
// 살았으면? energy - old

// 가을
// 나무 번식 나이가 5배수면 인접 8칸에 old 1인칸 push inRange

// 겨울
// 2중 for문으로 arr좌표값 만큼 energy 좌표값 +=
//
function springAndSummer() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j].length === 0) continue;

      let deadTreeOld = 0;
      const treeLength = board[i][j].length;
      for (let k = treeLength - 1; k >= 0; k--) {
        const old = board[i][j][k];
        if (old === -1) continue;
        if (energy[i][j] - old >= 0) {
          energy[i][j] -= old;
          board[i][j][k] += 1;
        } else if (energy[i][j] - old < 0) {
          deadTreeOld += Math.floor(old / 2);
          board[i][j][k] = -1;
        }
      }

      energy[i][j] += deadTreeOld;
      board[i][j] = board[i][j].filter((e) => e !== -1);
    }
  }
}

function fall() {
  const [dx, dy] = [
    [-1, -1, 0, 1, 1, 1, 0, -1],
    [0, 1, 1, 1, 0, -1, -1, -1],
  ];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j].length === 0) continue;
      const treeLength = board[i][j].length;
      for (let k = 0; k < treeLength; k++) {
        if (board[i][j][k] % 5 !== 0) continue;

        for (let l = 0; l < 8; l++) {
          const [nx, ny] = [i + dx[l], j + dy[l]];
          if (!inRange(nx, ny)) continue;
          board[nx][ny].push(1);
        }
      }
    }
  }
}

function winter() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      energy[i][j] += arr[i][j];
    }
  }
}

function inRange(x, y) {
  return 0 <= x && x < N && 0 <= y && y < N;
}
function solution() {
  let answer = 0;

  for (let i = 0; i < M; i++) {
    const [x, y, old] = input[i + N + 1].split(" ").map(Number);
    board[x - 1][y - 1].push(old);
  }

  for (let i = 0; i < K; i++) {
    springAndSummer();
    fall();
    winter();
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      answer += board[i][j].length;
    }
  }
  console.log(answer);
}

solution();

//풀이 설명
// 문제 구조상 tree를 1차원 배열로 묶는게 아닌
// 2차원 배열을 사용하며 해당하는 칸마다 tree를 삽입하고
// 죽은 나무는 삭제시키는 로직이 필수적으로 필요했다.
// 추가적으로 어린 나무부터 양분을 먹어야 한다는 조건과 함께 삽입 삭제를
// O(1)으로 끝내기 위해 (문제에서 초기 세팅은 중복된 좌표가 없다고
// 했기 때문에 따로 정렬은 하지 않음) 배열의 맨뒤에 새로 심은 나무를
// push 하며 내림차순을 보장해 추가적인 로직 필요 없이
// 삽입 삭제를 O(1)으로 처리할 수 있었다.
