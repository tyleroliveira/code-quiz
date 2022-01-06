var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount = 75;
var storedWins = 0;
var isGamePlaying = false;
// The init function is called when the page loads 
function init() {
  getWins();

}
// The startGame function is called when the start button is clicked
function startGame() {
  if (!isGamePlaying) {
    isGamePlaying = true;
  isWin = false;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer()
  }
}
// The winGame function is called when the win condition is met
function winGame() {
  startButton.disabled = true;
  setWins()
}
function wrongAnswer() {
  timerCount = timerCount - 10;
  startButton.disabled = true;
}
// The loseGame function is called when timer reaches 0
function loseGame() {
  startButton.disabled = true;
  isGamePlaying = false;
  alert("Game Over, you scored " + timerCount + " points!");
}
// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        if (timerCount > storedWins) {
          winGame();
        }
      }
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}
// Updates win count on screen and sets win count to client storage
function setWins() {
 if (timerCount >= localStorage.getItem("winCount")) { 
  win.textContent = timerCount;
  localStorage.setItem("winCount", timerCount);
  startButton.disabled = true;
}
}
// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value 
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
  startButton.disabled = true;
}
function checkWin() {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
    startButton.disabled = true;
  }
// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);
// Calls init() so that it fires when page opened
startButton.disabled = true;
init();
// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");
function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  localStorage.setItem("winCount", "0");
  window.location.reload();
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);

// start of other code
var questionDiv = document.querySelector("#question");
var questions = [
  {
    prompt: "",
    options: ["Start Quiz",],
    answer: "Start Quiz",
  },
  {
    prompt: "Commonly used data types DO NOT include:",
    options: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    prompt: "The condition in an if / else statement is enclosed within ______.",
    options: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    answer: "Quotes",
  }, 
  {
    prompt: "Arrays in JavaScript con be used to store __________.",
    options: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
    answer: "All of the above",
  },
  {
    prompt: "Strings values must be enclosed within _________ when being assigned to variables.",
    options: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    answer: "Quotes",
  },
  {
    prompt: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "Terminal/bash", "For loops", "Console.log"],
    answer: "Console.log",
  },
];

var questionIdx = 0;

function handleOptionClick(event) {
  // IF user clicked an answer-btn
  if (event.target.matches(".answer-btn")) {
    if (event.target.dataset.answer === "1") {
    }
    else {
      wrongAnswer();
    }
    };
    questionIdx += 1;
    startButton.disabled = true;
    showQuestion();
  }

function showQuestion() {
  questionDiv.innerHTML = "";

  if (questionIdx >= questions.length) {
    winCounter = timerCount
    winGame();
    checkWin();
    //alert("No more questions");
    alert("Game Over, you scored " + timerCount + " points!");
    window.location.reload();
    return;
  }

  var question = questions[questionIdx];

  // create h2
  var h2 = document.createElement("h2");
  // set h2 text to question prompt
  h2.textContent = question.prompt;
  // append h2 to questionDiv
  questionDiv.append(h2);

  // create answers div
  var answersDiv = document.createElement("div");

  // set class to "answers"
  answersDiv.classList.add("answers");
  // append answers div to questionDiv
  questionDiv.appendChild(answersDiv);

  // for each element of question options
  for (var i = 0; i < question.options.length; i++) {
    var optionText = question.options[i];
    var btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = optionText;

    // check if option is the answer
    if (optionText === question.answer) {
      btn.dataset.answer = 1;
    } else {
      btn.dataset.answers = 0;
    }

    answersDiv.appendChild(btn);
  }
  startButton.disabled = true;
}

// init page
questionDiv.addEventListener("click", handleOptionClick);
showQuestion();
