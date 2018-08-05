const timerControls = document.querySelector('.timer__controls');
const times = timerControls.querySelectorAll('[data-time]');

const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

let backAt;
let secondsLeft;
let intervalID;

function timer() {
    secondsLeft = (backAt.getTime() - Date.now()) / 1000;
    displayTimeLeft();
    if (secondsLeft <= 0) {
        clearInterval(intervalID);
    }
}

function displayTimeLeft() {
    const minutesLeft = Math.floor(secondsLeft / 60);
    const remainderSecondsLeft = Math.round(secondsLeft % 60);
    const timeLeftStr = `${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${remainderSecondsLeft < 10 ? '0' : ''}${remainderSecondsLeft}`;
    document.title = timeLeftStr;
    timeLeft.textContent = timeLeftStr;
}

function startTimer(e) {
    //set secondsLeft
    if (e.type === 'submit') {
        e.preventDefault();
        secondsLeft = parseInt(this.minutes.value) * 60 || 0;
        this.reset();
    } else {
        secondsLeft = this.dataset.time;
    }
    if (secondsLeft <= 0) return;

    backAt = new Date(Date.now() + secondsLeft * 1000);

    displayTimeLeft();

    endTime.textContent = `Be back at ${backAt.getHours() < 10 ? '0' : ''}${backAt.getHours()}:${backAt.getMinutes() < 10 ? '0' : ''}${backAt.getMinutes()}`;

    clearInterval(intervalID);
    intervalID = setInterval(timer, 1000);
}

times.forEach(time => time.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', startTimer);
