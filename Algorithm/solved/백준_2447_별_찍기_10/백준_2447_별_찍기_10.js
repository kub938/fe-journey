const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const n = Number(fs.readFileSync(filePath).toString().trim());

let patterns = ["*"];

function dfs(depth) {
  if (depth === n) {
    console.log(patterns.join("\n"));
    return;
  }

  const newPatterns = [];
  for (let line of patterns) {
    newPatterns.push(line.repeat(3));
  }

  for (let line of patterns) {
    newPatterns.push(line + " ".repeat(depth) + line);
  }

  for (let line of patterns) {
    newPatterns.push(line.repeat(3));
  }

  patterns = newPatterns;
  dfs(depth * 3);
}

dfs(1);
