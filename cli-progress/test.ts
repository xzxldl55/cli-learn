/**
 * 测试光标位置保存和回溯
 */

import ansiEscapes from 'ansi-escapes';

process.stdout.write(ansiEscapes.cursorHide); // 隐藏光标
process.stdout.write(ansiEscapes.cursorSavePosition); // 保存当前光标位置
process.stdout.write('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');

setTimeout(() => {
	process.stdout.write(ansiEscapes.cursorRestorePosition); // 回溯到上次保存的光标位置
	process.stdout.write('████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 1000);

setTimeout(() => {
	process.stdout.write(ansiEscapes.cursorRestorePosition);
	process.stdout.write('███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 2000);

setTimeout(() => {
	process.stdout.write(ansiEscapes.cursorRestorePosition);
	process.stdout.write('██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 3000);
