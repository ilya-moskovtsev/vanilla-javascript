const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
        .then((mediaStream) => {
            video.srcObject = mediaStream;
            video.onloadedmetadata = (e) => video.play();
        })
        .catch(err => console.error('Oops!', err));
}

function paintToCanvas() {
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        // take the pixels out
        let imageData = ctx.getImageData(0, 0, videoWidth, videoHeight);
        // mess with them
        // imageData = redEffect(imageData);
        // imageData = rgbSplit(imageData);
        // ctx.globalAlpha = 0.2;
        imageData = greenScreen(imageData);

        // put them back
        ctx.putImageData(imageData, 0, 0);
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man"/>`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] = imageData.data[i + 0] + 100; //red
        imageData.data[i + 1] = imageData.data[i + 1] - 50; //green
        imageData.data[i + 2] = imageData.data[i + 2] * 0.5; //blue
        imageData.data[i + 3] = imageData.data[i + 3]; //alpha
    }
    return imageData;
}

function rgbSplit(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 150] = imageData.data[i + 0]; //red
        imageData.data[i - 100] = imageData.data[i + 1]; //green
        imageData.data[i + 150] = imageData.data[i + 2]; //blue
        imageData.data[i + 3] = imageData.data[i + 3]; //alpha
    }
    return imageData;
}

function greenScreen(imageData) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });


    for (i = 0; i < imageData.data.length; i = i + 4) {
        red = imageData.data[i + 0];
        green = imageData.data[i + 1];
        blue = imageData.data[i + 2];
        alpha = imageData.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            imageData.data[i + 3] = 0;
        }
    }
    return imageData;
}


getVideo();

video.addEventListener('canplay', paintToCanvas);