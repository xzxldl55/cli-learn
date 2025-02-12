import blessed from 'blessed';
import fs from 'node:fs';
import { highlight } from 'cli-highlight';
import chalk from 'chalk';

// 定义自定义主题
const customTheme = {
	// 基础语法元素
	keyword: chalk.rgb(111, 180, 192),
	built_in: chalk.red,
	string: chalk.rgb(222, 192, 102),
	number: chalk.rgb(187, 124, 175),
	boolean: chalk.cyan,
	function: chalk.magenta,

	// 注释相关
	comment: chalk.green.italic,
	doctag: chalk.green.bold,

	// 类和变量
	class: chalk.bold.rgb(116, 172, 233),
	variable: chalk.rgb(116, 172, 233),

	// HTML/XML
	tag: chalk.blue,
	attr: chalk.cyan,
	value: chalk.green,

	// 其他元素
	operator: chalk.yellow,
	punctuation: chalk.gray,

	// 自定义样式组合
	'string.key': chalk.white.bold, // 字符串键名
	'function.call': chalk.cyan.bold, // 函数调用
	'class.title': chalk.rgb(116, 172, 233).underline, // 类名
};

const screen = blessed.screen({
	fullUnicode: true,
});

const fm = blessed.filemanager({
	parent: screen,
	border: 'line',
	height: 'half',
	width: 'half',
	top: 'center',
	left: 'center',
	label: ' {green-fg}%path{/green-fg} ',
	cwd: process.cwd(), // 设置当前工作目录
	keys: true,
	style: {
		selected: {
			bg: 'blue',
		},
	},
	// 设置滚动条样式
	scrollbar: {
		bg: 'white',
	},
});

fm.on('file', (file) => {
	screen.destroy();

	const ext = /\.([a-zA-Z0-9]+)$/.exec(file);
	const language = ext ? ext[1] : 'text';
	const code = fs.readFileSync(file, 'utf-8');
	// console.log(language, highlight);

	console.log(
		highlight(code, {
			language,
			theme: customTheme,
		})
	);
});

screen.key('C-c', () => {
	screen.destroy();
});

fm.refresh(); // 刷新文件列表，读取目录下信息

screen.render();
