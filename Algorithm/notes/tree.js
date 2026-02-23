const mindmap = {
  공부: ["수학", "영어", "코딩"],
  코딩: ["자료구조", "알고리즘"],
  자료구조: ["트리", "그래프"],
  수학: [],
  영어: [],
  알고리즘: [],
  트리: [],
  그래프: [],
};

// 위 구조를  표현?

function search(node) {
  if (!mindmap[node] || mindmap[node].length === 0) {
    return;
  }

  for (let i = 0; i < mindmap[node].length; i++) {
    console.log(mindmap[node][i]);
    search(mindmap[node][i]);
  }
}

// search("코딩");

function bfsSearch(start) {
  let queue = [start];
  let head = 0;

  while (queue.length > head) {
    const node = queue[head++];

    for (let i = 0; i < mindmap[node].length; i++) {
      queue.push(mindmap[node][i]);
      console.log(mindmap[node][i]);
    }
  }
}

// bfsSearch("코딩");
function bfsSearchPoint(start, end) {
  let head = 0;
  let queue = [[start, 0]]; //지금 node(key) 값 , parent node

  while (queue.length > head) {
    const node = queue[head][0];
    for (let i = 0; i < mindmap[node].length; i++) {
      queue.push([mindmap[node][i], head]);
      if (mindmap[node][i] === end) {
        rootSearch(head, queue);
        return;
      }
    }
    head++;
  }
}

let rootResult = [];
function rootSearch(head, queue) {
  if (head === 0) {
    return;
  }

  rootResult.push(queue[head][0]);
  rootSearch(queue[head][1], queue);
}
let queue = bfsSearchPoint("공부", "트리");

console.log("공부");

for (let i = rootResult.length - 1; i >= 0; i--) {
  console.log(rootResult[i]);
}
console.log("트리");
