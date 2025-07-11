//*그래프 양방향 주의*

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const computer_count = Number.parseInt(input[0]);
const virus = input.slice(2).map((e) => e.split(" ").map(Number));
const network = new Map();
let result = 0;

function set_network() {
  for (let i = 1; i <= computer_count; i++) {
    network.set(i, []);
  }

  virus.forEach(([from, to]) => {
    network.get(from).push(to);
    network.get(to).push(from);
  });
}

function spread_virus(here, visited = new Set()) {
  if (visited.has(here)) {
    return;
  }
  result += 1;
  visited.add(here);
  network.get(here).forEach((e) => spread_virus(e, visited));
}

function solution(input) {
  set_network();
  spread_virus(1);
}

solution(input);

console.log(result - 1);
