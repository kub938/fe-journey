const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const numbers = input.slice(1, 2).toString().split(" ").map(Number);
const signs_count = input.slice(2, 3).toString().split(" ").map(Number);
let signs_arr = make_signs_arr();
let visited = new Array(n - 1).fill(0);
let [min_value, max_value] = [1000000000, -1000000000];

function make_signs_arr() {
  let signs_arr = [];
  signs_count.forEach((count, index) => {
    for (i = 0; i < count; i++) {
      switch (index) {
        case 0:
          signs_arr.push("+");
          break;
        case 1:
          signs_arr.push("-");
          break;
        case 2:
          signs_arr.push("*");
          break;
        case 3:
          signs_arr.push("/");
          break;
      }
    }
  });

  return signs_arr;
}

function permutation(here, arr = []) {
  if (here === n - 1) {
    let tmp = numbers[0];
    arr.forEach((num, index) => {
      switch (signs_arr[num]) {
        case "+":
          tmp += numbers[index + 1];
          break;
        case "-":
          tmp -= numbers[index + 1];
          break;
        case "*":
          tmp *= numbers[index + 1];
          break;
        case "/":
          tmp = parseInt(tmp / numbers[index + 1]);
          break;
      }
    });
    min_value = Math.min(min_value, tmp);
    max_value = Math.max(max_value, tmp);
    return;
  }

  for (let i = 0; i < n - 1; i++) {
    if (visited[i] === 0) {
      visited[i] = 1;
      arr.push(i);
      permutation(here + 1, arr);
      visited[i] = 0;
      arr.pop();
    }
  }
}

function solution() {
  permutation(0);
  if (max_value === -0) {
    max_value = 0;
  }
  if (min_value === -0) {
    min_value = 0;
  }
  console.log(max_value);
  console.log(min_value);
}

solution();
