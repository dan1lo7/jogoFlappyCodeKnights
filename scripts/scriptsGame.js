const bird = document.getElementById("bird");
const gameContainer = document.getElementById("gameContainer");
const gameStatus = document.getElementById("gameStatus");

const containerTopPosition = gameContainer.getBoundingClientRect().top;
let birdTopPosition = bird.getBoundingClientRect().top;
let birdRelativeTopPosition = birdTopPosition - containerTopPosition;

const gravity = 3.1;
const jumpHeight = 10;
const jumpTotalHeight = 140;
const jumpIntervals = 14;
const intervalTime = 10;
let jumping = false;
let jumpCount = 0;

const initialBirdPosition = birdRelativeTopPosition;

function fall() {
  birdRelativeTopPosition += gravity;
  bird.style.top = birdRelativeTopPosition + "px";

  const containerHeight = gameContainer.clientHeight;

  if (birdRelativeTopPosition + bird.offsetHeight - gravity >= containerHeight) {
    bird.style.top = containerHeight - bird.offsetHeight + "px";
    gameStatus.innerText = "Morreu";
    gameStatus.style.color = "red";
    setTimeout(restartGame, 1000);
  }
}

function jump() {
  if (!jumping) {
    jumping = true;
    jumpCount = 0;

    const jumpInterval = setInterval(() => {
      if (jumpCount < jumpIntervals) {
        birdRelativeTopPosition -= jumpHeight;
        bird.style.top = birdRelativeTopPosition + "px";
        jumpCount++;
      } else {
        clearInterval(jumpInterval);
        jumping = false;
      }
    }, intervalTime);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

setInterval(fall, intervalTime);