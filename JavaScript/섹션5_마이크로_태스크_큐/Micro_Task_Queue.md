# 마이크로 태스크 큐

## 마이크로 태스크 큐는 뭘까?

지금까지는 Callback Queue를 한가지로 알고 있었지만 사실 2가지로 나뉜다
한가지는 Micro Task Queue 다른 한 가지는 Macro Task Queue이다
이때 Macro Task Queue는 우리가 할고 있던 SetTimeout, setInterval, DomEvent에 대한 처리를 맡고
Micro Task Queue는 Promise의 처리를 맡는다
이때 우선순위는 Micro Task Queue가 가지게 된다.

## 실행 순서 예제

```javascript
console.log("start");

setTimeout(() => {
  console.log("a: setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("i: promise.then");
});

console.log("end");
```

이때 실행 순서는
start
end
i: promise.then
a: setTimeout
이렇게 된다

그 이유는
start는 기본적으로 실행,
setTimeout 등록
Promise 등록
end 실행
Promise가 Micro Task queue에 담겨 있기 때문에 우선순위에 의해 먼저 Call Stack
에 등록후 실행
그후 setTimeout Call Stack에 등록 후 실행

## 왜 필요한거지?

Promise가 resolve되고 난 뒤에 then이 여러개 있다면 callback이 여러번 실행되게 되는데 이것은 연속된 작업이여야 한다.
하지만 나눠 놓지 않는다면 setTimeout과 같은 callback이 중간에 들어 와 예상치 못한 작업을 실행 할 수 도 있기 때문에 나눠서 관리해 연속성을 보장한다.

## 왜 MicroTask Queue부터 실행되는거야?

딱히 이유는 없음

## Micro Task가 중단되는 케이스

```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Promise.resolve()
  .then(async () => {
    console.log("then 1");
    await delay(2000);
  })
  .then(() => {
    console.log("then2");
  });

setTimeout(() => {
  console.log("setTimeout 1");
}, 1000);
```

위의 상황에서 실행순서
Promise 등록
setTimeout 등록
Promise실행
await를 만나 일단 해당 async함수 실행 정지 (micro task queue에 다른 작업이 있으면 그것부터 실행 -> macro task queue 실행)
setTimeout 내부 실행 (console.log("setTimeout 1");)
delay 함수 실행 후 다음 .then으로 Promise가 넘어감

## MutationObserver

MutationObserver도 Microtask queue에 들어간다
queueMicrotask()를 사용하면 임의로 micro task queue에 넣을 수 있다
