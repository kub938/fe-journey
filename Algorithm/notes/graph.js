const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"],
};

function graphSearchBfs(start) {
  let visited = new Set();
  let queue = [start];
  let head = 0;

  visited.add(start);

  while (queue.length > head) {
    const node = queue[head++];

    for (let i = 0; i < graph[node].length; i++) {
      const nowNode = graph[node][i];
      if (visited.has(nowNode)) continue;

      queue.push(nowNode);
      visited.add(nowNode);
    }
  }

  console.log(queue);
}

graphSearchBfs("A");

console.log(new Set("ABC"));
