const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controlKeys = document.querySelectorAll('.controls i');
let gameOver = false;
let foodX = 13, foodY = 20;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score : ${highScore}`;
function snakeGame() {
    const changeFoodPosition = () => {
        foodX = Math.round(Math.random() * 30);
        foodY = Math.round(Math.random() * 30);


    }
    function handleGameOver() {
        clearInterval(setIntervalId);
        alert(`Game Over , Your Score :${score}
            Press OK to Replay... `);
        location.reload();
    }
    const changeDirection = (e) => {
        // console.log(e);
        if (e.key === "ArrowUp" && velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
        }
        else if (e.key === "ArrowDown" && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
        }

        else if (e.key === "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
        }
        else if (e.key === "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
        }
    }

    controlKeys.forEach((key) => {
        key.addEventListener("click", () => {
            changeDirection({ key: key.dataset.controlKey });
        });
    });




    const initGame = () => {

        if (gameOver)
            return handleGameOver();
        let htmlMarkUp = `<div class="food" style="grid-area:${foodY}/${foodX}"> </div>`;
        if (snakeX === foodX && snakeY === foodY) {
            changeFoodPosition();
            snakeBody.push([foodX, foodY]);
            // console.log(snakeBody);
            score++;
            highScore = score > highScore ? score : highScore;
            scoreElement.innerHTML = `Score : ${score}`;
            highScoreElement.innerHTML = `High Score : ${highScore}`;
            localStorage.setItem("high-score", highScore);

        }
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
        snakeBody[0] = [snakeX, snakeY];

        snakeX += velocityX;
        snakeY += velocityY;

        if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
            gameOver = true;
        }
        for (let i = 0; i < snakeBody.length; i++) {
            htmlMarkUp += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"> </div>`;
            if (i != 0 && snakeBody[i][1] === snakeBody[0][1] && snakeBody[i][0] === snakeBody[0][0]) {
                gameOver = true;
            }
        }

        playBoard.innerHTML = htmlMarkUp;
    }
    changeFoodPosition();
    setIntervalId = setInterval(initGame, 150);
    document.addEventListener("keydown", changeDirection);

}
snakeGame();

