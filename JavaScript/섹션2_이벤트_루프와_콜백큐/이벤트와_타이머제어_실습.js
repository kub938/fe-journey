const toggleBtn = document.querySelector("#toggleBtn");
const log = document.querySelector("#log");

let intervalID = null;
toggleBtn.addEventListener("click", () => {
  if (intervalID) {
    clearInterval(intervalID);
    intervalID = null;
  } else {
    intervalID = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      log.textContent = currentTime;
    }, 1000);
  }
});
