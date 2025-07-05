console.log("Rock Paper Scissor Game Loaded");

const buttons = document.querySelectorAll('.choice-button');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const resultTextElem = document.getElementById('result-text');
const playerChoiceImg = document.getElementById('player-choice-image');
const computerChoiceImg = document.getElementById('Computer-choice-image');

const choices = ['rock', 'paper', 'scissors'];
const imgMap = {
  rock: 'src/Rock.png',
  paper: 'src/Paper.png',
  scissors: 'src/Scissors.png'
};

let playerScore = 0;
let computerScore = 0;

let loadingInterval;
let loadingIndex = 0;

function startLoadingAnimation() {
  loadingIndex = 0;
  if (loadingInterval) clearInterval(loadingInterval);
  loadingInterval = setInterval(() => {
    const choice = choices[loadingIndex % choices.length];
    playerChoiceImg.src = imgMap[choice];
    playerChoiceImg.alt = "Loading...";
    computerChoiceImg.src = imgMap[choice];
    computerChoiceImg.alt = "Loading...";
    loadingIndex++;
  }, 400);
}

function stopLoadingAnimation() {
  if (loadingInterval) clearInterval(loadingInterval);
}


function getComputerChoice() {
  const idx = Math.floor(Math.random() * choices.length);
  return choices[idx];
}

function updateImages(playerChoice, computerChoice) {
  playerChoiceImg.src = imgMap[playerChoice];
  playerChoiceImg.alt = playerChoice;
  computerChoiceImg.src = imgMap[computerChoice];
  computerChoiceImg.alt = computerChoice;
}

function getResult(player, computer) {
  if (player === computer) return "It's a tie!😐";
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    playerScore++;
    return "You win!🎉";
  } else {
    computerScore++;
    return "Computer wins!😞";
  }
}

function updateScores() {
  playerScoreElem.textContent = `Player Score: ${playerScore}`;
  computerScoreElem.textContent = `Computer Score: ${computerScore}`;
}

function animateResult(result) {
  resultTextElem.className = "";
  if (result.includes("win") && !result.includes("Computer")) resultTextElem.classList.add("win");
  else if (result.includes("tie")) resultTextElem.classList.add("tie");
  else resultTextElem.classList.add("lose");
  resultTextElem.style.transform = "scale(1.2)";
  setTimeout(() => resultTextElem.style.transform = "scale(1)", 300);
}

buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    stopLoadingAnimation();
    const userinput = button.dataset.choice;
    const computerChoice = getComputerChoice();
    updateImages(userinput, computerChoice);
    const result = getResult(userinput, computerChoice);
    resultTextElem.textContent = result;
    updateScores();
    animateResult(result);

    
    setTimeout(startLoadingAnimation, 1200);
  });
});

startLoadingAnimation();