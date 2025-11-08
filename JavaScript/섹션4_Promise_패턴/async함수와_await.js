//------------async 함수와 await를 쓰지않은 이전 강의 코드--------------
// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`Waited for ${ms}ms`);
//     }, ms);
//   });
// }

// delay(1000)
//   .then((message) => {
//     return `Done: ${message}`;
//   })
//   .then((finalMessage) => {
//     console.log(finalMessage);
//   });

//----------------async 함수와 await로 리팩토링 ----------------------
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${ms}ms`);
    }, ms);
  });
}

async function process() {
  const result = await delay(1000);
  return result;
}

//이때 추가적으로 then을 넣는 것처럼 처리하고 싶다면 async함수도 Promise를 반환하기 때문에 이런식으로 처리할 수 도 있다
async function foo() {
  const result = await process();
  console.log(result);
}
foo();

//--------------------top level await--------------------------
//

//------------------------------------------------------------
// function resolveAfter2Seconds() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("resolved");
//     }, 2000);
//   });
// }

// async function asyncCall() {
//   console.log("calling");
//   const result = await resolveAfter2Seconds();
//   console.log(result);
// }

// asyncCall();
