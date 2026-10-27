const moods = [
  {
    name: "Curious",
    emoji: "☁️👀",
    description: "Silvia Cloud found something interesting."
  },

  {
    name: "Sleepy",
    emoji: "☁️💤",
    description: "Maybe five more minutes..."
  },

  {
    name: "Focused",
    emoji: "☁️💻",
    description: "Silvia Cloud is busy making something."
  },

  {
    name: "Excited",
    emoji: "☁️✨",
    description: "Something exciting is happening!"
  },

  {
    name: "Confused",
    emoji: "☁️❓",
    description: "Silvia Cloud is trying to figure things out."
  }
];

const moodName = document.getElementById("mood-name");
const moodEmoji = document.getElementById("mood-emoji");
const moodDescription = document.getElementById("mood-description");
const nextButton = document.getElementById("next");
const counter = document.getElementById("counter");

let currentIndex = 0;

function showMood() {

  const mood = moods[currentIndex];

  moodName.textContent = mood.name;
  moodEmoji.textContent = mood.emoji;
  moodDescription.textContent = mood.description;

  counter.textContent =
    (currentIndex + 1) + " / " + moods.length;
}

nextButton.addEventListener("click", function () {

  currentIndex = (currentIndex + 1) % moods.length;

  showMood();

});

showMood();