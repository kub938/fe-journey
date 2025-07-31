const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(file_path)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [h, w, n, m] = input;

console.log(Math.ceil(h / (n + 1)) * Math.ceil(w / (m + 1)));
