// const xhr = new XMLHttpRequest();

// xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     console.log("응답 : ", xhr.responseText);
//   }
// };

// xhr.send();

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  console.log(data);
}

fetchData();

//await 키워드 다시보기 키워드는Promise가 해결될 때 까지 함수 실행을 멈춘다
