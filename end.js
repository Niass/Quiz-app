const game = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// localStorage.setItem("highScores", JSON.stringify([]));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHightScore = e => {
  e.preventDefault();
  console.log("hello");
  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
  };
  console.log(score.score);
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
  console.log(highScores);
  console.log(score.score);
};
