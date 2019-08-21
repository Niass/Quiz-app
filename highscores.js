const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const highScoresMap = highScores
  .map(score => {
    return `<li class="high-score"> ${score.name}  -  ${score.score} </li> `;
  })
  .join("");

console.log(highScoresMap);

highScoresList.innerHTML = highScoresMap;
