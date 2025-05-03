// Array Of Words (Game Words)
const words = [
  "Speed",
  "Focus",
  "Typing",
  "Challenge",
  "Swift",
  "Momentum",
  "Dynamic",
  "Turbo",
  "Flash",
  "Victory",
  "Quick",
  "Rocket",
  "Zoom",
  "Power",
  "Drive",
  "Algorithm",
  "Forest",
  "Soccer",
  "Galaxy",
  "Eclipse",
  "Champion",
  "Journey",
  "Inspire",
  "Vision",
  "Thunder",
  "Cycling",
  "Fitness",
  "Legacy",
  "Endurance",
  "Clarity",
];

// Game Levels (Easy, Intermediate, Hard)
const lvls = {
  Easy: 10,
  Intermediate: 7,
  Hard: 5,
};

// Default Level Settings
let defaultLevelName = "Intermediate"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// scor

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let WordIndex = words.indexOf(randomWord);
  // Remove Word From Array
  words.splice(WordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Paly Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Show Temporary Message in Input Field
        input.style.color = "green";
        input.value = "👏 Great Keep Going!";
        setTimeout(() => {
          input.style.color = "";
          input.value = "";
        }, 1000);

        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("🎉 Congratulations You Won");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("❌ Game Over Try Again");
        span.appendChild(spanText);
        finishMessage.appendChild(span);

        // Show Retry Button
        document.querySelector(".retry").style.display = "block";
      }
    }
  }, 1000);
}

let retryButton = document.querySelector(".retry");

retryButton.onclick = function () {
  location.reload();
};