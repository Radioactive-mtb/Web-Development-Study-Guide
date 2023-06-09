var startButton = document.querySelector(".startButton");
var questionContainerEl = document.querySelector("#questionContainer");
var score = 0;
var questionEl = document.querySelector("#question");
var answerBtnEl = document.querySelector("#answerButtons");
var timerEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".score");
var inputScoreEl = document.querySelector("#inputScore");
var submitInitialsBtnEl = document.querySelector("#submitInitials");
var initialsEl = document.querySelector("#initials");
var userScoreEl = document.querySelector("#score");
var highScoresEl = document.querySelector("#highScores");
var showScoresEl = document.querySelector("#showScores");
var timer;

var shuffledQuestions, currentQuestion;

startButton.addEventListener("click", startGame);
answerBtnEl.addEventListener("click", () => {
  currentQuestion++;
  nextQuestion();
});

function startGame() {
  console.log("started");
  startButton.setAttribute("class", "hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  questionContainerEl.removeAttribute("class", "hide");
  timerCount = 20;
  score = 0;
  startTimer();
  nextQuestion();
}

function nextQuestion() {
  reset();
  if (shuffledQuestions.length > currentQuestion + 1) {
    showQuestion(shuffledQuestions[currentQuestion]);
  } else {
    gameOver();
  }
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.Text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnEl.appendChild(button);
  });
}

function reset() {
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

function selectAnswer(e) {
  var selectedBtn = e.target;
  var correct = selectedBtn.dataset.correct;
  setTimer(document.body, correct);
  Array.from(answerBtnEl.children).forEach((button) => {
    setTimer(button, button.dataset.correct);
  });
}

function setTimer(element, correct) {
  if (correct) {
    increaseScore();
  } else {
    decreaseTime();
  }
}

function increaseScore() {
  scoreEl.textContent = score++;
}

function decreaseTime() {
  timerEl.textContent = timerCount--;
  console.log(timerCount);
}

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = timerCount;

    if (timerCount === 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  //alert("Game Over");
  clearInterval(timer);
  userScoreEl.textContent = score;
  inputScore();
}

function inputScore() {
  questionContainerEl.setAttribute("class", "hide");
  inputScoreEl.removeAttribute("class", "hide");
}

submitInitialsBtnEl.addEventListener("click", function () {
  let initValue = initialsEl.value;
  console.log(initValue);
  if (initValue) {
    let userScore = { username: initValue, userScore: score };
    initialsEl.value = "";
    highScores = JSON.parse(localStorage.getItem("scores")) || [];
    highScores.push(userScore);
    localStorage.setItem("scores", JSON.stringify(highScores));
    inputScoreEl.setAttribute("class", "hide");
    renderHighScores();
  }

  function renderHighScores() {
    //scoresEl.innerHTML = "";
    highScoresEl.removeAttribute("class", "hide");
    highScores = JSON.parse(localStorage.getItem("scores"));
    console.log(highScores);
    for (let i = 0; i < highScores.length; i++) {
      let scoreItem = document.createElement("div");
      scoreItem.className += "row mb-3 p-2";
      console.log(scoreItem);
      scoreItem.setAttribute("style", "background-color:PaleTurquoise");
      scoreItem.textContent = `${i + 1}. ${highScores[i].username} - ${
        highScores[i].userScore
      }`;
      showScoresEl.appendChild(scoreItem);
    }
  }
});

var questions = [
  {
    question: "What is a variable?",
    answers: [
      { Text: "A variable is a container for a value", correct: true },
      {
        Text: "A variable is a piece of code that performs a task",
        correct: false,
      },
      { Text: "A variable is a not apart of javascript", correct: false },
    ],
  },
  {
    question: "What is an array?",
    answers: [
      { Text: "A variable", correct: true },
      { Text: "A function", correct: false },
      { Text: "A decleration", correct: false },
    ],
  },
  {
    question: "What is function?",
    answers: [
      { Text: "A piece of code that is a place holder", correct: false },
      { Text: "A piece of code that stores a value", correct: false },
      { Text: "A piece of code that holds a single value", correct: false },
      {
        Text: "A piece of code that does a single task in a defined block",
        correct: true,
      },
    ],
  },
  {
    question: "Can a variable have values of different data types?",
    answers: [
      { Text: "No", correct: false },
      { Text: "Yes", correct: true },
    ],
  },
  {
    question: "Where does the return statment go?",
    answers: [
      { Text: "At the begining of a function", correct: false },
      { Text: "At the end of a function", correct: true },
      { Text: "Oustide the function", correct: false },
      { Text: "In the middle of the function", correct: false },
    ],
  },
];
