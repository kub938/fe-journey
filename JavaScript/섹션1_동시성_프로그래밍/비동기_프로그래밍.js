function foo() {
  console.log("오늘은 놀고 싶은날 ~ 푸 ~~ ㅋㅋ");
}
function blockUI() {
  const start = Date.now();

  setTimeout(() => {
    console.log("끝");
  }, 3000);
  debugger;
}

blockUI();
foo();
