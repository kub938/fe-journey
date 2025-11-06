function a() {
  b();
}

function b() {
  console.log("Hello");
}

a();

function Second() {
  setTimeout(() => {
    console.log("2빠따로 실행");
  }, 1000);
}

function First() {
  setTimeout(() => {
    console.log("1빠따로 실행");
  }, 10);
}

First();
for (let i = 0; i < 10000000000; i++) {}
console.log("끝");
