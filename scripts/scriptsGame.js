const bird = document.getElementById('bird');
const gameContainer = document.getElementById('gameContainer');

const containerPosition = gameContainer.getBoundingClientRect().top;
const birdPosition = bird.getBoundingClientRect().top;
let birdRelativePosition = birdPosition - containerPosition ;
const gravity = 2.8;
const intervalTime = 15;


function fall() {
    birdRelativePosition += gravity;
    bird.style.top = birdRelativePosition + 'px';

    const containerHeight = gameContainer.clientHeight;

    if (birdRelativePosition + bird.offsetHeight - gravity >= containerHeight) {
        birdRelativePosition = containerHeight - bird.offsetHeight;
    }
}

setInterval(fall, intervalTime);