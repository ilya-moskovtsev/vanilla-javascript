const timerControls = document.querySelector('.timer__controls');
const times = timerControls.querySelectorAll('[data-time]');

const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

let secondsLeft = 0;
let intervalID;

function timer() {
    --secondsLeft;
    displayTimeLeft(secondsLeft);
    if (secondsLeft <= 0) {
        clearInterval(intervalID);
    }
}

function displayTimeLeft(secondsLeft) {
    const minutesLeft = Math.floor(secondsLeft / 60);
    const remainderSecondsLeft = secondsLeft % 60;
    const timeLeftStr = `${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${remainderSecondsLeft < 10 ? '0' : ''}${remainderSecondsLeft}`;
    document.title = timeLeftStr;
    timeLeft.textContent = timeLeftStr;
}

function startTimer(e) {
    clearInterval(intervalID);

    //set secondsLeft
    if (e.type === 'submit') {
        e.preventDefault();
        secondsLeft = parseInt(this.minutes.value) * 60 || 0;
        this.reset();
    } else {
        secondsLeft = this.dataset.time;
    }

    displayTimeLeft(secondsLeft);

    const backAt = new Date(Date.now() + secondsLeft * 1000);
    endTime.textContent = `Be back at ${backAt.getHours()}:${backAt.getMinutes()}`;

    intervalID = setInterval(timer, 1000);
}

times.forEach(time => time.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', startTimer);
