const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function handleToggle() {
    let icon;
    if (video.paused) {
        video.play();
        icon = '❚❚';
    } else {
        video.pause();
        icon = '►';
    }
    toggle.textContent = icon;
}

function handleSkip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
    video[this.name] = this.value;
}

function handleProgress(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

function handleProgressBar() {
    progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}

toggle.addEventListener('click', handleToggle);
video.addEventListener('click', handleToggle);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', handleSkip));

ranges.forEach(range => {
        range.addEventListener('mousedown', () =>
            range.addEventListener('mousemove', handleRange)
        );
        range.addEventListener('mouseup', () =>
            range.removeEventListener('mousemove', handleRange)
        );
    }
);

progress.addEventListener('click', handleProgress);

video.addEventListener('timeupdate', handleProgressBar);