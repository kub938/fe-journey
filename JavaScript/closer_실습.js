//음 싱글톤 패턴 같은 느낌?
function outer() {
  let x = 0;
  function inner() {}
  function get() {}
  function set() {}
  return { inner, get, set };
}

const f = outer();

console.log(f.x); //이렇게 접근 불가능 (의도적으로 막혀 있음)

function counter() {
  let cnt = 0;
  function increase() {
    cnt++;
    return cnt;
  }

  function decrease() {
    cnt--;
    return cnt;
  }

  return { increase, decrease };
}

const count = counter();

console.log(count.increase());
console.log(count.increase());
console.log(count.increase());
console.log(count.increase());

//싱글톤이랑 다른점
//싱글톤은 단 한개의 인스턴스만 존재, 즉시 실행되는 팩토리 함수
const singleton = (() => {
  let state = 0;
  return {
    get: () => state,
    set: (v) => (state = v),
  };
})();

//아래는 그냥 클로저 팩토리 함수.
//인스턴스 여러개 생성 가능
function createStore() {
  let state = 0;
  return {
    get: () => state,
    set: (v) => (state = v),
  };
}
