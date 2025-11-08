# Promise APIs 활용(병렬처리)

## 직렬처리

두개의 Request가 의존적이라면?

/datas -> 파싱 -> /id/detail

```javascript
//dataList의 id 값을 받은 뒤 그 값을 이용해 detail을 찾는 로직
async function fetchOnethenAnother() {
  const res = await fetch("/datas");
  const dataList = await res.json();

  const id = dataList[0].id;

  const detailRes = await fetch(`/${id}/detail`);
  const detail = await detailRes.json();

  console.log(detail);
}
```

## 병렬처리

### 두개의 Request가 독립적이라면?

/datas -> 파싱
/others -> 파싱

```javascript
//실행 순서는 보장되지 않지만 병렬 처리됨
const aPromise = fetch("/a").then((res) => res.json());
const bPromise = fetch("/b").then((res) => res.json());

aPromise.then((data) => doSomethingA(data));
bPromise.then((data) => doSomethingB(data));
```

```javascript
console.log("start");
fetch("https://dummyjson.com/products/1")
  .then((res) => res.json())
  .then((data) => {
    console.log("dummyJson:", data);
  });
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => res.json())
  .then((data) => {
    console.log("jsonplaceholder:", data);
  });

console.log("end");
```

### 두개의 Request가 독립적이지만, 두 개의 응답이 모두 필요할때.

Promise.all을 사용해서 처리

위의 코드를 수정한다면 아래와 같이 사용할 수 있음

```javascript
Promise.all([
  fetch("https://dummyjson.com/products/1").then((res) => res.json()),
  fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
    res.json()
  ),
]).then(([dummyJson, jsonPlaceholder]) => {
  //두가지 모두 왔을 때 실행 but 각각의 도착 시간 차이가 클 경우 주의해서 사용해야한다.
  console.log(dummyJson);
  console.log(jsonPlaceholder);
});
```

이 코드를 async await로 리팩토링 하면? 아래와 같이 만들 수 있습니다.

```javascript
async function fetchDummyAndPlaceholder() {
  const response = await Promise.all([
    fetch("https://dummyjson.com/products/1").then((res) => res.json()),
    fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
      res.json()
    ),
  ]);

  return response;
}

async function printDummyAndPlaceholder() {
  const [dummyJson, jsonPlaceholder] = fetchDummyAndPlaceholder();
  console.log(dummyJson);
  console.log(jsonPlaceholder);
}

printDummyAndPlaceholder();
```

## 기타 Promise 함수들

1. Promise.all()
   정상 : 모두 완료된 결과 확인
   오류 : 하나라도 실패하면, 즉시 전체가 reject
2. Promise.allSettled()
   정상 : 모두 완료된 결과 확인
   오류 : 성공/실패 상관 없이 끝날때 까지 기다림(모두 실패해도 reject 안됨)
   에러건 정상이건 일단 모두 받아서 내가 처리 할때 사용
3. Promise.race()
   정상 : 제일 먼저 끝난 것 사용
   오류 : 가장 먼저 끝난 것이 실패라면 즉시 reject (보수적인 형태)
4. Promise.any()
   정상 : 제일 먼저 끝난 것 사용
   오류 : 모두 실패해야 reject됨
