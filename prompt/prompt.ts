import EventEmitter from 'events';
import readline from 'readline';
import ansiEscapes from 'ansi-escapes';

export interface Key {
	name: string;
	sequence: string;
}

let onKeypress: (str: string, key: Key) => void;

export abstract class Prompt extends EventEmitter {
	public value: string = '';
	public rl: readline.Interface;

	constructor() {
		super();

		readline.emitKeypressEvents(process.stdin); // 监听键盘事件
		this.rl = readline.createInterface({ input: process.stdin }); // 创建 readline 实例

		process.stdin.setRawMode(true); // 禁用内置键盘事件（如 ctrl+c）

		onKeypress = this.onKeypress.bind(this);
		process.stdin.on('keypress', onKeypress); // 在命令行输入监听 keypress 事件
	}

    abstract onKeyInput(str: string, key: Key): void;

	private onKeypress(str: string, key: Key) {
        if (key.sequence === '\x03') {
            return process.exit();
        }

		// 处理回车事件
        if (key.name === 'return') {
            return this.close();
        }

		this.onKeyInput(str, key);
    }

    close() {
		// 问题结束后清除所有行
		process.stdout.write(ansiEscapes.eraseLines(process.stdout.rows));
		process.stdin.removeListener('keypress', onKeypress); // 移除监听键盘事件
		process.stdin.setRawMode(false); // 恢复内置键盘事件

		this.rl.close(); // 关闭 readline 实例解除对键盘的监听
		this.emit('submit', this.value) // 触发 submit 事件
    }
}
