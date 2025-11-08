# async 함수와 await

## 왜 쓰나요?

- .then을 사용하지 않고 setTime과 같은 Promise 내부 로직이 완료된 후에 결과값을 받을 수 있어 편리하다

## async 함수를 사용하면?

return문을 사용할 시 자동으로 Promise로 감싸진다

```javascript
async function getValue() {
  return 42; //자동으로 Promise로 감싸짐
}

await getValue();
```

## await 뒤에는?

Promise 객체가 올 수 있다
하지만 일반값이 올 경우 Promise로 변환된다

```javascript
await fetch("/api/data"); //Promise 반환
await Promise.resolve(1);

await 123; //Promise 변환 === await Promise.resolve(123)
await "hello";
await null;
```

await는 blocking 하는 코드이기 때문에 조심히 다뤄야함
