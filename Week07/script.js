let moodNumber = 0;

const moodText = document.querySelector("#mood");
const moodCircle = document.querySelector("#moodCircle");
const changeButton = document.querySelector("#changeButton");

changeButton.addEventListener("click", function () {

  moodNumber = moodNumber + 1;

  if (moodNumber === 1) {
    moodText.textContent = "calm";
    moodCircle.textContent = "☁️";
    document.body.style.backgroundColor = "#dcecff";
  }

  else if (moodNumber === 2) {
    moodText.textContent = "happy";
    moodCircle.textContent = "☀️";
    document.body.style.backgroundColor = "#fff3b0";
  }

  else if (moodNumber === 3) {
    moodText.textContent = "sleepy";
    moodCircle.textContent = "🌙";
    document.body.style.backgroundColor = "#d9d5ff";
  }

  else {
    moodNumber = 0;
    moodText.textContent = "How are you feeling?";
    moodCircle.textContent = "?";
    document.body.style.backgroundColor = "#f0f0ec";
  }

});