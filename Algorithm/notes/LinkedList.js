// 내부에서만 사용할 Node 클래스
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

/**
 * Java의 java.util.LinkedList와 유사한 기능을 제공하는 이중 연결 리스트 클래스입니다.
 */
class LinkedList {
  constructor() {
    this.head = null; // 리스트의 첫 번째 노드
    this.tail = null; // 리스트의 마지막 노드
    this._size = 0; // 리스트의 크기
  }

  /**
   * 리스트의 맨 끝에 요소를 추가합니다.
   * @param {*} value - 추가할 값
   */
  add(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this._size++;
  }

  /**
   * 지정된 인덱스에 요소를 추가합니다.
   * @param {number} index - 요소를 추가할 위치
   * @param {*} value - 추가할 값
   */
  addAt(index, value) {
    if (index < 0 || index > this._size) {
      throw new Error("Index out of bounds");
    }

    if (index === this._size) {
      this.add(value);
      return;
    }

    if (index === 0) {
      const newNode = new Node(value);
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
      this._size++;
      return;
    }

    const currentNode = this._getNode(index);
    const prevNode = currentNode.prev;
    const newNode = new Node(value);

    newNode.next = currentNode;
    newNode.prev = prevNode;
    prevNode.next = newNode;
    currentNode.prev = newNode;

    this._size++;
  }

  /**
   * 지정된 인덱스의 노드를 반환하는 내부 헬퍼 메서드입니다.
   * @param {number} index - 찾을 노드의 인덱스
   * @returns {Node} - 해당 인덱스의 노드
   */
  _getNode(index) {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }

    // 최적화: 인덱스가 리스트의 절반보다 작으면 head에서부터, 크면 tail에서부터 검색
    let currentNode;
    if (index < this._size / 2) {
      currentNode = this.head;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
    } else {
      currentNode = this.tail;
      for (let i = this._size - 1; i > index; i--) {
        currentNode = currentNode.prev;
      }
    }
    return currentNode;
  }

  /**
   * 지정된 인덱스의 값을 반환합니다.
   * @param {number} index - 조회할 값의 인덱스
   * @returns {*} - 해당 인덱스의 값
   */
  get(index) {
    return this._getNode(index).value;
  }

  /**
   * 지정된 인덱스의 값을 새로운 값으로 변경합니다.
   * @param {number} index - 변경할 값의 인덱스
   * @param {*} value - 새로운 값
   */
  set(index, value) {
    const node = this._getNode(index);
    node.value = value;
  }

  /**
   * 지정된 인덱스의 요소를 제거하고 그 값을 반환합니다.
   * @param {number} index - 제거할 요소의 인덱스
   * @returns {*} - 제거된 요소의 값
   */
  remove(index) {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      // 첫 번째 요소 제거
      const value = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null; // 리스트가 비게 됨
      }
      this._size--;
      return value;
    }

    if (index === this._size - 1) {
      // 마지막 요소 제거
      const value = this.tail.value;
      this.tail = this.tail.prev;
      this.tail.next = null;
      this._size--;
      return value;
    }

    const nodeToRemove = this._getNode(index);
    const prevNode = nodeToRemove.prev;
    const nextNode = nodeToRemove.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    this._size--;
    return nodeToRemove.value;
  }

  /**
   * 리스트의 크기를 반환합니다.
   * @returns {number} - 리스트에 있는 요소의 수
   */
  size() {
    return this._size;
  }

  /**
   * 리스트가 비어있는지 확인합니다.
   * @returns {boolean} - 비어있으면 true, 아니면 false
   */
  isEmpty() {
    return this._size === 0;
  }

  /**
   * 리스트의 모든 요소를 제거합니다.
   */
  clear() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  /**
   * 리스트를 배열 형태로 반환합니다.
   * @returns {Array} - 리스트의 모든 값을 담은 배열
   */
  toArray() {
    const arr = [];
    let currentNode = this.head;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return arr;
  }

  /**
   * 리스트를 문자열로 표현하여 반환합니다. (디버깅용)
   * @returns {string}
   */
  toString() {
    return this.toArray().join(" <-> ");
  }
}

// 사용 예시
/*
const list = new LinkedList();
list.add('a');
list.add('b');
list.add('c');
console.log("초기 리스트:", list.toString()); // a <-> b <-> c

list.addAt(1, 'X');
console.log("addAt(1, 'X'):", list.toString()); // a <-> X <-> b <-> c
console.log("get(2):", list.get(2)); // b

list.remove(2);
console.log("remove(2):", list.toString()); // a <-> X <-> c

list.set(0, 'A');
console.log("set(0, 'A'):", list.toString()); // A <-> X <-> c

console.log("리스트 크기:", list.size()); // 3
*/
