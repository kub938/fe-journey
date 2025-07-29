const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");

const n = Number(input[0]);
const k = Number(input[1]);
const apple_pos = input.slice(2, 2 + k).map((e) => e.split(" ").map(Number));
const l = input[2 + k];
const dir_order = input.slice(2 + k + 1).map((e) => e.split(" "));

const [dx, dy] = [
  [-1, 0, 1, 0],
  [0, 1, 0, -1],
]; //시계방향

let snake = [[0, 0]];
let board = new Array(n).fill(0).map((e) => new Array(n).fill(0));
let time = 0;
let dir_order_idx = 0;
let dir = 1;

function solution() {
  apple_pos.forEach((e) => {
    const [r, c] = [e[0] - 1, e[1] - 1];
    board[r][c] = 1;
  });

  let flag = true;
  while (flag) {
    check_dir_order();
    let next_pos = get_next_pos();
    if (!next_pos) {
      flag = false;
    }
    time++;
  }

  console.log(time);
}

function in_range(x, y) {
  return 0 <= x && x < n && 0 <= y && y < n;
}

function is_include(nx, ny) {
  return snake.some((e) => {
    return e[0] === nx && e[1] === ny;
  });
}

function get_next_pos() {
  const snake_head = snake[snake.length - 1];
  const x = snake_head[0];
  const y = snake_head[1];
  let [nx, ny] = [x + dx[dir], y + dy[dir]];
  if (!in_range(nx, ny)) {
    return false;
  }
  if (is_include(nx, ny)) {
    return false;
  }

  if (board[nx][ny] === 0) {
    snake.shift();
  }

  if (board[nx][ny] === 1) {
    board[nx][ny] = 0;
  }
  snake.push([nx, ny]);

  return true;
}

function check_dir_order() {
  if (dir_order_idx >= l) return;
  if (time === Number(dir_order[dir_order_idx][0])) {
    if (dir_order[dir_order_idx][1] === "L") {
      if (dir - 1 < 0) {
        dir = 3;
      } else {
        dir -= 1;
      }
    } else {
      dir = (dir + 1) % 4;
    }
    dir_order_idx += 1;
  }
}

solution();
