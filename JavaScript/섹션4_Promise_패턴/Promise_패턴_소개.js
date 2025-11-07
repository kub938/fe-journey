function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Waited for ${ms}ms`);
    }, ms);
  });
}

const result = delay(1000);

//----------pending과 정상적인 결과값 호출에 대한 예제-------------
console.log(result); //pending 호출

setTimeout(() => {
  console.log(result); //정상적인 결과값 호출
}, 1100);
//위의 경우 첫번째 출력의 경우 [Promise객체가 생성 -> setTimeout 등록 -> Promise객체 반환] 이 과정만을 거친 뒤 출력했기 때문에 pending 상태인 Promise 객체가 출력된다
//하지만 두번째 출력의 경우 설정해 뒀던 setTimeout이 callstack에 들어가 실행된 후의 Promise이기 때문에 정상적으로 message가 출력되는것을 볼 수 있다.
//이런 방식을 실제로 사용한다면 꼬일 수 있기 때문에  .then을 사용해 안전하게 처리하는것이 좋을것 같다.

//-------------일반적인 사용법--------------------------
delay(1000)
  .then((res) => {
    console.log(res);
    return res; //return문을 작성 안하면 아래의 then에 Promise가 안넘어감
  })
  .then((res) => {
    console.log("res 받음", res);
  });

//-----------------구체적인 동작 방식----------------------
function delayDetail(ms) {
  console.log(`[0ms] Promise 생성 시작`);

  return new Promise((resolve) => {
    console.log(`[0ms] setTimeout 등록: ${ms}ms 후 실행`);

    setTimeout(() => {
      console.log(`[${ms}ms] setTimeout 콜백 실행`);
      console.log(`[${ms}ms] resolve() 호출`);
      resolve(`Waited for ${ms}ms`);
      console.log(`[${ms}ms] Promise Fulfilled 상태로 변경`);
    }, ms);

    console.log(`[0ms] Promise 반환 (Pending)`);
  });
}

console.log("[0ms] === 시작 ===");

const promise = delayDetail(1000);

console.log("[0ms] .then() 호출");
promise.then((res) => {
  console.log(`[1000ms] .then() 콜백 실행: ${res}`);
});

console.log("[0ms] .then() 등록 완료");
console.log("[0ms] === 동기 코드 종료 ===");
