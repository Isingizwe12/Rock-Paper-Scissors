const score = JSON.parse(localStorage.getItem('score'))||{
  wins: 0,
  losses: 0,
  ties:0
}

updateScore();

function pickComputerMove() {
  let computerMove = '';

  const randomNumber = Math.random();
  if (randomNumber > 0 && randomNumber <= 1 / 3) {
    computerMove = 'Rock';
  }
  else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = 'Paper';
  }
  else if (randomNumber > 2 / 3 && randomNumber <= 3 / 3) {
    computerMove = 'Scissors';
  }
  console.log(computerMove);
  return computerMove;

}

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  
  let result = '';
   
  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie';
    }
    else if (computerMove === 'Paper') {
      result = 'You lose';
    }
    else if (computerMove === 'Scissors') {
      result = 'You win';
    }
  }
  else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win';
    }
    else if (computerMove === 'Paper') {
      result = 'Tie';
    }
    else if (computerMove === 'Scissors') {
      result='You lose'
    }
  }
  else if (playerMove === 'Scissors') {
    if (computerMove === "Rock") {
      result = "You lose";
    } else if (computerMove === 'Paper') {
      result = "You win";
    } else if (computerMove === 'Scissors') {
      result = "Tie";
    }
      
  }

  if (result === 'You win') {
    score.wins++;
  }
  else if (result === 'You lose') {
    score.losses++;
  }
  else if (result === 'Tie') {
    score.ties++;
  }
  console.log(localStorage.setItem('score', JSON.stringify(score)));

  console.log(playerMove);
  console.log(`result is ${result}`);

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `you picked <img src="/icon/${playerMove}-emoji.png" alt="" class="moves"> computer picked <img src="/icon/${computerMove}-emoji.png" alt="" class="moves">`;
  updateScore();
  
  
}
function updateScore() {
 document.querySelector(
   ".js-score"
 ).innerHTML = `wins:${score.wins} losses:${score.losses} ties:${score.ties}`; 
}
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  let autoPlayBtn = document.querySelector(".auto-play-js");
  if (autoPlayBtn.innerText === 'AutoPlay') {
    autoPlayBtn.innerHTML = 'Stop';
  }

  else {
    autoPlayBtn.innerHTML = "AutoPlay";
  }
  if (!isAutoPlaying) {
     intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
