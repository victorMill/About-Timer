const counter = document.getElementById("stop-watch_counter");
const startBtn = document.getElementById("stop-watch_start");
const restartBtn = document.getElementById("stop-watch_restart");
const stopWatchBtns = document.getElementById("stop-watch_btns");

let subSeconds = 0;
let setIntervalID = 0;

//------------------------------TIMER--------------------

function arrangeButtons() {
  if (
    stopWatchBtns.style.gridTemplateColumns === "1fr 1fr" &&
    startBtn.className === "fa-solid fa-circle-play btn"
  ) {
    startBtn.className = "";
    startBtn.classList.add("fa-solid", "fa-circle-pause", "btn");
  } else if (
    stopWatchBtns.style.gridTemplateColumns === "1fr 1fr" &&
    startBtn.className === "fa-solid fa-circle-pause btn"
  ) {
    startBtn.className = "";
    startBtn.classList.add("fa-solid", "fa-circle-play", "btn");
  } else if (
    stopWatchBtns.style.gridTemplateColumns === "" &&
    startBtn.className === "fa-solid fa-circle-play btn"
  ) {
    const stopBtn = document.createElement("i");
    stopBtn.classList.add("fa-solid", "fa-circle-stop", "btn");
    stopBtn.id = "stop-watch_restart";
    stopWatchBtns.style.gridTemplateColumns = "1fr 1fr";
    stopBtn.addEventListener("click", resetTimer);
    stopWatchBtns.appendChild(stopBtn);

    startBtn.className = "";
    startBtn.classList.add("fa-solid", "fa-circle-pause", "btn");
  }
}

function showTime() {
  let hours = Math.floor(subSeconds / 36000);
  let minutes = Math.floor((subSeconds - hours * 36000) / 600);
  let seconds = Math.floor((subSeconds - hours * 36000 - minutes * 600) / 10);
  let centiSeconds = Math.round(
    subSeconds - hours * 36000 - minutes * 600 - seconds * 10
  );

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (centiSeconds < 10) {
    centiSeconds = "0" + centiSeconds;
  }
  return `${minutes}:${seconds}:${centiSeconds}`;
}

function startTimer() {
  arrangeButtons();
  setIntervalID = setInterval(() => {
    subSeconds++;
    counter.innerText = showTime();
  }, 100);
  isRunning = true;
}

let isRunning = false;
startBtn.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

function pauseTimer() {
  clearInterval(setIntervalID);
  isRunning = false;
  arrangeButtons();
}

function resetTimer() {
  clearInterval(setIntervalID);
  subSeconds = 0;
  isRunning = false;
  counter.innerText = showTime();
  stopWatchBtns.removeChild(stopWatchBtns.lastChild);
  stopWatchBtns.style.removeProperty("grid-template-columns");
  startBtn.className = "";
  startBtn.classList.add("fa-solid", "fa-circle-play", "btn");
}
