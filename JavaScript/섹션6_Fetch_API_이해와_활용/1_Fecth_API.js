const URL = "https://jsonplaceholder.typicode.com/todos/1";

async function fetchData(URL) {
  const res = await fetch(URL);
  const result = await res.json();
  console.log(result);
}

fetchData(URL);
