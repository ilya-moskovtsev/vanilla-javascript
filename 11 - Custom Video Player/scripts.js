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

toggle.addEventListener('click', handleToggle);
video.addEventListener('click', handleToggle);
