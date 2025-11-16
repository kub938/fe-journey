class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  insert(value) {
    this.heap.push(value);
    let nowIdx = this.heap.length - 1;

    if (this.heap.length <= 1) {
      return;
    }

    while (
      this.heap[nowIdx] > this.heap[Math.floor(nowIdx / 2)] &&
      nowIdx !== 1
    ) {
      const parentIdx = Math.floor(nowIdx / 2);
      const tmp = this.heap[parentIdx];
      this.heap[parentIdx] = this.heap[nowIdx];
      this.heap[nowIdx] = tmp;

      nowIdx = parentIdx;
    }
  }

  pop() {
    if (this.heap.length === 2) {
      this.heap.pop();
      return;
    }

    let parentIdx = 1;
    this.heap[parentIdx] = this.heap[this.heap.length - 1];
    this.heap.pop();
    console.log(this.heap);

    while (this.heap.length > 1) {
      const leftIdx = parentIdx * 2;
      const rightIdx = parentIdx * 2 + 1;

      if (Math.floor(parentIdx / 2) === Math.floor(this.heap.length / 2)) {
        return;
      }

      if (
        this.heap[leftIdx] <= this.heap[parentIdx] &&
        this.heap[rightIdx] <= this.heap[parentIdx]
      ) {
        return;
      }

      if (this.heap[leftIdx] >= this.heap[rightIdx]) {
        //왼쪽거가 더 크면
        const tmp = this.heap[leftIdx];
        this.heap[leftIdx] = this.heap[parentIdx];
        this.heap[parentIdx] = tmp;
        parentIdx = leftIdx;
      } else if (this.heap[rightIdx] > this.heap[leftIdx]) {
        const tmp = this.heap[rightIdx];
        this.heap[rightIdx] = this.heap[parentIdx];
        this.heap[parentIdx] = tmp;
        parentIdx = rightIdx;
      }
    }
  }
}

let maxHeap = new MaxHeap();
maxHeap.insert(10);
maxHeap.insert(20);
maxHeap.insert(30);
maxHeap.insert(40);
maxHeap.insert(50);
maxHeap.insert(60);
maxHeap.pop();

console.log(maxHeap.heap);
