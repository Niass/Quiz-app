const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
// const choices2 = document.querySelectorAll(".choice-text");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
  .then(res => {
    // console.log(res);
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQ => {
      const formattedQuestions = {
        question: loadedQ.question
      };

      const answerChoices = [...loadedQ.incorrect_answers];
      // console.log("answerChoices", answerChoices);
      formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
      // console.log("formattedQuestions", formattedQuestions);
      console.log("formattedQuestions.answer", formattedQuestions.answer);
      answerChoices.splice(
        formattedQuestions.answer - 1,
        0,
        loadedQ.correct_answer
      );

      console.log(
        "answerChoicesIndex",
        answerChoices.indexOf(loadedQ.correct_answer)
      );
      answerChoices.forEach((choice, index) => {
        formattedQuestions["choice" + (index + 1)] = choice;
        // console.log("formattedQuestions", formattedQuestions);
      });
      return formattedQuestions;
    });
    // questions = loadedQuestions;
    startGame();
  })
  .catch(err => {
    console.log(err);
  });

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // Go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // Update the progress bar
  // progressBarFull.style.width = "50%";
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  console.log("availableQuestions", availableQuestions);
  console.log("currentQuestion", currentQuestion);
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
// console.log(username);
jeSuisUnH1.addEventListener("click", () => {
  console.log("clicked h1");
});
