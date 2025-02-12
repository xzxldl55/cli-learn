// Text 类型 Prompt
import { Prompt, Key } from './prompt.js';
import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';

export interface TextPromptOptions {
	type: 'text';
	name: string;
	message: string;
	placeholder?: string;
}

// 判断一个字符是否为 ASCII 不可打印的控制字符（如空字符，制表符，换行符，回车符，删除符......）
function isNonPrintableChar(char: string) {
	return /^[\x00-\x1F\x7F]$/.test(char);
}

export class TextPrompt extends Prompt {
	public out: NodeJS.WriteStream = process.stdout;
	public cursor: number = 0;

	constructor(private options: TextPromptOptions) {
		super();
	}

	onKeyInput(str: string, key: Key): void {
		// 处理退格符：光标左移，删除字符（并同步到 value）
		if (key.name === 'backspace') {
			this.cursor--;
			this.value = this.value.slice(0, this.cursor);
		}

		// 处理非控制字符：非控制字符能正常打印，光标右移，同步值到 value
		if (!isNonPrintableChar(str)) {
			this.cursor++;
			this.value += str;
		}

		this.render();
	}

	render() {
		this.out.write(ansiEscapes.eraseLine); // 清除当前行内容
		this.out.write(ansiEscapes.cursorTo(0)); // 将光标移动到行首

        /**
         * 打印问题 + 目前用户输入的内容 this.value
         * this.options.message> this.value
         */
		this.out.write([chalk.bold(this.options.message), chalk.gray('>'), ' ', chalk.blue(this.value)].join(''));
        this.out.write(ansiEscapes.cursorSavePosition); // 保存当前光标位置

        /**
         * 展示/隐藏 placeholder：
         * 如果用户输入为空，则提示请输入名字(placeholder)
         * 如果用户已经有输入值了，清除 placeholder
         */
        if (this.value === '' && this.options.placeholder) {
            this.out.write(chalk.red(this.options.placeholder)); // 如果用户输入为空，则提示请输入名字(placeholder)
		}

        this.out.write(ansiEscapes.cursorRestorePosition); // 恢复光标位置
	}
}

