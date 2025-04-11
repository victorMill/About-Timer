const counter = document.getElementById("watch_counter");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const stopWatchBtns = document.getElementById("watch_btns");

const btn30 = document.getElementById("time_30");
const btn100 = document.getElementById("time_100");
const btn500 = document.getElementById("time_500");

const alarm = document.getElementById("alarm");

let seconds = 0;
let setIntervalID = 0;

//------------------------------TIMER--------------------

function arrangeButtons() {
  if (
    stopWatchBtns.style.gridTemplateColumns === "1fr 1fr" &&
    startBtn.className === "fa-solid fa-circle-play btn"
  ) {
    startBtn.className = "";
    startBtn.classList.add("fa-solid", "fa-circle-pause", "btn");
    startBtn.style.display = "flex";
    startBtn.style.justifyContent = "center";
    startBtn.style.alignItems = "center";
  } else if (
    stopWatchBtns.style.gridTemplateColumns === "1fr 1fr" &&
    startBtn.className === "fa-solid fa-circle-pause btn"
  ) {
    startBtn.className = "";
    startBtn.classList.add("fa-solid", "fa-circle-play", "btn");
    startBtn.style.display = "flex";
    startBtn.style.justifyContent = "center";
    startBtn.style.alignItems = "center";
  } else if (
    stopWatchBtns.style.gridTemplateColumns === "" &&
    startBtn.className === "fa-solid fa-circle-play btn"
  ) {
    const stopBtn = document.createElement("i");
    stopBtn.classList.add("fa-solid", "fa-circle-stop", "btn");
    stopBtn.id = "restart-btn";
    stopWatchBtns.style.gridTemplateColumns = "1fr 1fr";
    stopBtn.addEventListener("click", reset);
    stopWatchBtns.appendChild(stopBtn);

    stopBtn.style.display = "flex";
    stopBtn.style.justifyContent = "center";
    stopBtn.style.alignItems = "center";

    startBtn.className = "";
    startBtn.classList.add("fa-solid", "fa-circle-pause", "btn");
    startBtn.style.display = "flex";
    startBtn.style.justifyContent = "center";
    startBtn.style.alignItems = "center";
  }
}

function stringToSeconds() {
  const num = parseInt(counter.value.replace(/:/g, ""));
  const hours = Math.floor(num / 10000);
  const minutes = Math.floor((num - hours * 10000) / 100);
  const thisSeconds = Math.floor(num - hours * 10000 - minutes * 100);
  return hours * 3600 + minutes * 60 + thisSeconds;
}

function showTime() {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  let thisSeconds = Math.floor(seconds - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (thisSeconds < 10) {
    thisSeconds = "0" + thisSeconds;
  }
  return `${hours}:${minutes}:${thisSeconds}`;
}

function start() {
  counter.classList.remove("blink");
  seconds = 0;
  seconds += stringToSeconds();

  if (seconds === 0 || counter.value === "") {
    counter.value = "00:00:00";
    return;
  }
  arrangeButtons();
  setIntervalID = setInterval(() => {
    seconds--;
    if (seconds === 0) {
      counter.classList.add("blink");
      alarm.play();
      setTimeout(() => {
        alarm.pause();
      }, 1900);
      reset();
    }
    counter.value = showTime();
  }, 1000);
  isRunning = true;
}

function continueTimer() {
  arrangeButtons();
  setIntervalID = setInterval(() => {
    seconds--;
    if (seconds === 0) {
      reset();
    }
    counter.value = showTime();
  }, 1000);
  isRunning = true;
}

let isRunning = false;
startBtn.addEventListener("click", () => {
  if (isRunning) {
    pause();
  } else {
    start();
  }
});

function pause() {
  clearInterval(setIntervalID);
  isRunning = false;
  seconds = 0;
  arrangeButtons();
}

function reset() {
  clearInterval(setIntervalID);
  seconds = 0;
  isRunning = false;
  initialTimeAdded = false;
  counter.value = showTime();
  stopWatchBtns.removeChild(stopWatchBtns.lastChild);
  stopWatchBtns.style.removeProperty("grid-template-columns");
  startBtn.className = "";
  startBtn.classList.add("fa-solid", "fa-circle-play", "btn");
}

btn30.addEventListener("click", () => {
  seconds += 30;
  counter.value = showTime();
});

btn100.addEventListener("click", () => {
  seconds += 60;
  counter.value = showTime();
});

btn500.addEventListener("click", () => {
  seconds += 300;
  counter.value = showTime();
});
