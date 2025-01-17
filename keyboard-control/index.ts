import readline from 'readline';
import { ScrollList } from './scroll-list.js';
import ansiEscapes from 'ansi-escapes';

clearScreen();

const scroll = new ScrollList([
	'语文',
	'数学',
	'英语',
	'物理',
	'化学',
	'生物',
	'历史',
	'地理',
	'政治',
	'体育',
	'音乐',
	'美术',
	'信息技术',
	'通用技术',
	'科学',
	'技术',
	'艺术',
	'体育与健康',
	'心理健康',
	'道德与法治',
	'劳动教育',
	'综合实践活动',
	'其他',
]);

readline.emitKeypressEvents(process.stdin); // 使用输入流处理键盘事件

process.stdin.setRawMode(true); // 禁用内置键盘事件（如 ctrl+c）

// 监听输入流
process.stdin.on('keypress', (str, key) => {
	// 等价于 key.ctrl && key.name === 'c'
	if (key.sequence === '\x03') {
		process.stdout.write(ansiEscapes.cursorShow);
		process.exit();
	}
	// console.log(str, key);
	scroll.onKeyInput(key.name);
});

function clearScreen() {
	const repeatCount = process.stdout.rows - 2; // 获取当前终端的行数（这里 - 2用来额外显示当前命令行）
	const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : ''; // 根据终端可显示行数，生成这么多空行
	console.log(blank);
	readline.cursorTo(process.stdout, 0, 0);
	readline.clearScreenDown(process.stdout);
}
