// Select 类型 Prompt
import { Prompt, Key } from './prompt.js';
import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';

export interface SelectPromptOptions {
	type: 'select';
	name: string;
	message: string;
	choices: Array<{
		title: string;
		description?: string;
		value: string;
	}>;
}

export class SelectPrompt extends Prompt {
	public out: NodeJS.WriteStream = process.stdout;
	public cursor: number = 0;
	public line: number = 0;

	constructor(private options: SelectPromptOptions) {
		super();
		this.value = this.options.choices[this.line].value;
	}

	onKeyInput(str: string, key: Key) {
		// 处理上下键
		if (key.name === 'up') {
			this.line--;
		}
		if (key.name === 'down') {
			this.line++;
		}

		// 边界处理
		this.line = this.line < 0 ? 0 : this.line;
		this.line = this.line >= this.options.choices.length ? this.options.choices.length - 1 : this.line;

		this.value = this.options.choices[this.line].value;

		this.render();
	}

	render() {
		this.out.write(ansiEscapes.eraseLines(this.options.choices.length + 1)); // 清除当Select区域内容
		
		this.out.write(
			[chalk.bold(this.options.message), chalk.gray('>'), this.value ? chalk.blue(this.value) : chalk.gray(' - 使用↑↓选择，回车键确认选择')].join('')
		);

		for (let i = 0; i < this.options.choices.length; i++) {
			const choice = this.options.choices[i];
			this.out.write(ansiEscapes.cursorDown(1) + ansiEscapes.cursorTo(0)); // 光标向下移动到下一行首位
			this.out.write(chalk.bold.gray('❯   ')); // 制表符控制排版

			this.out.write(
				[this.line === i ? chalk.underline.blue(choice.title) : chalk.gray(choice.title), ' - ', chalk.gray(choice.description)].join('')
			);
		}
	}
}
