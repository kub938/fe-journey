class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  shift() {
    const headData = this.head.data;
    if (this.isEmpty()) {
      return console.error("빈 배열 입니다");
    }

    if (this.head.next === null && this.head !== null) {
      this.head = null;
      this.tail = null;
      return headData;
    } else if (
      this.head !== null &&
      this.tail !== null &&
      this.head.next !== null
    ) {
      this.head = this.head.next;
      return headData;
    }
  }

  push(data) {
    const node = new Node(data);

    if (this.isEmpty()) {
      this.tail = node;
      this.head = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  peek() {
    return this.head.data;
  }

  getAllElement() {}

  isEmpty() {
    return this.head ? false : true;
  }
}

let que = new Queue();

que.push(2);
console.log(que.peek());
