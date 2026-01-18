const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const [dx, dy] = [
  [0, -1, 0, 1],
  [1, 0, -1, 0],
]; //동 북 서 남

function solution() {
  let board = Array(101)
    .fill(0)
    .map((_) => Array(101).fill(0));
  for (let i = 1; i < n + 1; i++) {
    const [Y, X, D, G] = input[i].split(" ").map(Number);
    let coord = [
      [X, Y, D],
      [X + dx[D], Y + dy[D], D],
    ];

    board[X][Y] = 1;
    board[X + dx[D]][Y + dy[D]] = 1;

    for (let j = 0; j < G; j++) {
      let targetCoord = coord.length - 1;

      while (targetCoord > 0) {
        const d = coord[targetCoord][2];

        const dir = (d + 1) % 4;
        const [nx, ny] = [
          coord[coord.length - 1][0] + dx[dir],
          coord[coord.length - 1][1] + dy[dir],
        ];
        board[nx][ny] = j + 1;
        coord.push([nx, ny, dir, j]);

        targetCoord--;
      }
    }
  }

  console.log(checkSquare(board));
}

function checkSquare(board) {
  let answer = 0;
  const [dx, dy] = [
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ];

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let cnt = 0;
      for (let k = 0; k < 4; k++) {
        if (board[i + dx[k]][j + dy[k]] === 0) break;
        cnt++;
      }
      if (cnt === 4) answer++;
    }
  }

  return answer;
}
solution();
