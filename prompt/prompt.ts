import EventEmitter from 'events';
import readline from 'readline';

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
		this.rl = readline.createInterface({ input: process.stdin });

		process.stdin.setRawMode(true); // 禁用内置键盘事件（如 ctrl+c）

		onKeypress = this.onKeypress.bind(this);
		process.stdin.on('keypress', onKeypress); // 在命令行输入监听 keypress 事件
	}

    abstract onKeyInput(str: string, key: Key): void;

	private onKeypress(str: string, key: Key) {
        if (key.sequence === '\x03') {
            return process.exit();
        }

        if (key.name === 'return') {
            return this.close();
        }
    }

    close() {
        
    }
}
