import { ProgressBar } from './progress-bar.js';
import https from 'node:https';
import fs from 'node:fs';

function testProgress() {
	const bar = new ProgressBar();

	bar.start(100);

	let value = 0;

	let timer = setInterval(() => {
		value++;

		bar.update(value);

		if (value >= bar.getTotalSize()) {
			bar.stop();
			clearInterval(timer);
		}
	}, 100);
}

// testProgress();

function downloadProgress() {
	const DOWNLOAD_URL = {
		linux: 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip',
		darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
		win32: 'https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip',
		win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip',
	};

	https.get(DOWNLOAD_URL.darwin, res => {
		const file = fs.createWriteStream('./chromium.zip');
		res.pipe(file);

		const totalBytes = parseInt(res.headers['content-length']!, 10);

		let progress = 0;
		const bar = new ProgressBar();
		bar.start(totalBytes);

		res.on('data', chunk => {
			progress += chunk.length;
			bar.update(progress);

			if (progress >= bar.getTotalSize()) {
				bar.stop();
			}
		})
	})
}

downloadProgress();
