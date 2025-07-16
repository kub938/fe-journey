const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const number_arr = input[1].split(" ").map(Number);
const section_list = input.slice(2);
const prefix_sum_arr = new Array(N + 1).fill(0);
let result_arr = new Array();

function make_prefix_sum_arr() {
  let sum_value = 0;
  number_arr.forEach((e, index) => {
    sum_value += e;
    prefix_sum_arr[index + 1] = sum_value;
  });
}

function section_prefix_sum_value() {
  section_list.forEach((e) => {
    const [start, end] = e.split(" ").map(Number);
    const prefix_sum_value = prefix_sum_arr[end] - prefix_sum_arr[start - 1];
    result_arr.push(prefix_sum_value);
  });
  result_arr = result_arr.join("\n");
}

function solution() {
  make_prefix_sum_arr();
  section_prefix_sum_value();
  console.log(result_arr);
}

solution();
