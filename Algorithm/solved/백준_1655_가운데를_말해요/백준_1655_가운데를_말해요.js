const fs = require("fs");
const filepath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const n = Number(input[0]);
const numbers = input.slice(1).map(Number);

function solution() {
  class MaxHeap {
    constructor() {
      this.maxHeap = [];
      this.length = 0;
    }

    push(value) {
      this.maxHeap.push(value);
      this.length += 1;
      const length = this.maxHeap.length;

      if (this.length > 1 && this.maxHeap[length - 2] > value) {
        this.maxHeap[length - 1] = this.maxHeap[length - 2];
        this.maxHeap[length - 2] = value;
      }
    }

    get() {
      if (this.length === 0) {
        return 0;
      }
      return this.maxHeap[this.maxHeap.length - 1];
    }

    pop() {
      return this.maxHeap.pop();
    }
  }

  class MinHeap {
    constructor() {
      this.minHeap = [];
      this.length = 0;
    }

    push(value) {
      this.minHeap.push(value);
      this.length += 1;

      const length = this.minHeap.length;
      if (this.length > 1 && this.minHeap[length - 2] < value) {
        this.minHeap[length - 1] = this.minHeap[length - 2];
        this.minHeap[length - 2] = value;
      }
    }

    get() {
      if (this.length === 0) {
        return 0;
      }
      return this.minHeap[this.minHeap.length - 1];
    }

    pop() {
      return this.minHeap.pop();
    }
  }

  const maxHeap = new MaxHeap();
  const minHeap = new MinHeap();

  pushNumbers(numbers, maxHeap, minHeap);
}

function pushNumbers(numbers, maxHeap, minHeap) {
  numbers.forEach((number) => {
    if (maxHeap.length > minHeap.length) {
      minHeap.push(number);
    } else {
      maxHeap.push(number);
    }

    if (maxHeap.length === 0) {
      return;
    }

    if (
      maxHeap.get() !== 0 &&
      minHeap.get() !== 0 &&
      maxHeap.get() > minHeap.get()
    ) {
      const tmp = minHeap.pop();
      minHeap.push(maxHeap.pop());
      maxHeap.push(tmp);
    }

    console.log(maxHeap.get());
  });

  maxHeap.push(10);
}

solution();
