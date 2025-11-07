// function step1() {
//   setTimeout(() => {
//     console.log("1초 지연");
//     step2();
//   }, 1000);
// }

// function step2() {
//   setTimeout(() => {
//     console.log("2초 지연");
//     step3();
//   }, 2000);
// }

// function step3() {
//   setTimeout(() => {
//     console.log("3초 지연");
//   }, 3000);
// }

// step1();

//---------1차 리팩토링-----------//
// function step1() {
//   console.log("1초 지연");
//   setTimeout(step2, 2000);
// }

// function step2() {
//   console.log("2초 지연");
//   setTimeout(step3, 3000);
// }

// function step3() {
//   console.log("3초 지연");
// }

// setTimeout(step1, 1000);

//-------------2차 리팩토링------/
// function delay(cb, ms) {
//   console.log(`${ms}ms후 실행`);
//   setTimeout(cb, ms);
// }

// function step1() {
//   delay(step2, 2000);
// }

// function step2() {
//   delay(step3, 3000);
// }

// function step3() {
//   console.log("3초 지연");
// }

// delay(step1, 1000);

//---------3차 한줄로 만들기-----//

function delay(cb, ms) {
  console.log(`${ms}ms후 실행`);
  setTimeout(cb, ms);
}

const step1 = () => delay(step2, 2000);
const step2 = () => delay(step3, 3000);
const step3 = () => console.log("3초 지연");

delay(step1, 1000);
