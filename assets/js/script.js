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
var timerCount;
var storedWins = 0;

// The init function is called when the page loads 
function init() {
  getWins();
  //getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 75;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  //renderBlanks()
  startTimer()
}

// The winGame function is called when the win condition is met
function winGame() {
  //wordBlank.textContent = "YOU WON!!!🏆 ";
  //winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function wrongAnswer() {
  //wordBlank.textContent = "GAME OVER";
  //loseCounter++
  //console.log(timerCount);
  timerCount = timerCount - 10;
  //console.log(timerCount);
  startButton.disabled = false;
  //setLosses()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  //wordBlank.textContent = "GAME OVER";
  //loseCounter++
  //console.log(timerCount);
  //timerCount = timerCount - 3;
  //console.log(timerCount);
  startButton.disabled = false;
  alert("Game Over, you scored " + timerCount + " points!");
  //setLosses()
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
  win.textContent = timerCount;
  localStorage.setItem("winCount", timerCount);
}

// Updates lose count on screen and sets lose count to client storage
//function setLosses() {
//   lose.textContent = loseCounter;
//   localStorage.setItem("loseCount", loseCounter);
// }

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
}

// function getlosses() {
//   var storedLosses = localStorage.getItem("loseCount");
//   if (storedLosses === null) {
//     loseCounter = 0;
//   } else {
//     loseCounter = storedLosses;
//   }
//   lose.textContent = loseCounter;
// }

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  //if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
//}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  localStorage.setItem("winCount", "0");
  window.location.reload();
  //console.log("works")
  // Renders win and loss counts and sets them into client storage
  //setWins()
  //setLosses()
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
    prompt: "What is the color of the sky?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Blue",
  },
  {
    prompt: "What is the color of the sky?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Blue",
  }, 
  {
    prompt: "What is the color of the sky?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Blue",
  },
  {
    prompt: "Which shape is round?",
    options: ["Square", "Triangle", "Trapezoid", "Circle"],
    answer: "Circle",
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
      //winGame();
      //console.log(winCounter);
    } else {
      btn.dataset.answers = 0;
      //wrongAnswer();
    }

    answersDiv.appendChild(btn);
  }
}

// init page
questionDiv.addEventListener("click", handleOptionClick);
showQuestion();
