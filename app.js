'use strict';

const qS = q => document.querySelector(q);

const video = qS('video');

let audioCtx, audioAnalyser, audioSource, bufferLength = 128, dataArray, width, height, initialized = false;

function initAudio() {
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	audioAnalyser = audioCtx.createAnalyser();
	audioAnalyser.smoothingTimeConstant = 0.75;

	audioSource = audioCtx.createMediaElementSource(video);
	audioSource.connect(audioAnalyser);

	audioAnalyser.connect(audioCtx.destination);
	audioAnalyser.fftSize = 512;

	bufferLength = audioAnalyser.frequencyBinCount / 2;
	dataArray = new Uint8Array(bufferLength);
}

function resize() {
	if (window.innerWidth / window.innerHeight >= 16/9) {
		video.style.width = window.innerWidth + 'px';
		video.style.height = window.innerWidth * 9 / 16 + 'px';
	} else {
		video.style.height = window.innerHeight + 'px';
		video.style.width = window.innerHeight * 16 / 9 + 'px';
	}
}

resize();
window.addEventListener('resize', resize);
document.body.addEventListener('click', _ => {
	if (!initialized) {
		video.muted = false;
		initAudio();
		initialized = true;
		qS('.hint').style.display = 'none';
	}
});
