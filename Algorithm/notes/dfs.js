// const graph = {
//   1: [2, 3],
//   2: [4],
//   3: [4, 5],
//   4: [],
//   5: [],
// };

// const dfs = (here, visited = new Set()) => {
//   if (visited.has(here)) return;

//   visited.add(here);
//   console.log(here);
//   graph[here].forEach((e) => dfs(e, visited));
// };

// dfs(1);

const graph = {
  0: [1, 2],
  1: [4, 3],
  2: [5, 6],
  3: [],
  4: [],
  5: [],
  6: [],
};
function dfsExample(depth) {
  // if (depth === graph.length) {
  //   console.log("최대 depth 도착");
  //   return;
  // }

  graph[depth].forEach((g) => {
    console.log(g, "노드 들어가요");
    dfsExample(g);
  });
}

dfsExample(0);
