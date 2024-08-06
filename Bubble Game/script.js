let score = 0;
let time = 60;
let intervalId;


function hitGenerate() {
    rnHit = Math.floor(Math.random() * 10);
    document.querySelector('.hit').innerHTML = rnHit;

}

function increaseScore() {
    score += 10;
}
document.querySelector('.game-details')
    .addEventListener('click', (det) => {
        console.log(det.target);

    });
function timer() {
    time--;
    if (time === 0) {
        clearInterval(intervalId);
        return;
    }
    document.querySelector('.timer').innerHTML = time;
}
intervalId = setInterval(timer, 1000);
function makeBubble() {
    let htmlMarkUp = "";
    for (let i = 0; i <= 500; i++) {
        htmlMarkUp += `   <div class="bubble">${Math.floor(Math.random() * 10)}</div>`;
    }

    document.querySelector('.bubble-board').innerHTML = htmlMarkUp;

}
function hitMatch() {
    let clickedBubble;
    document.querySelector('.game-details')
        .addEventListener('click', (details) => {

            console.log(detail.target.value);
        });


}
makeBubble();
timer();
hitGenerate();
hitMatch();