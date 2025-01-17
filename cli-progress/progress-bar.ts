import ansiEscapes from 'ansi-escapes';
import { EOL } from 'os'; // 换行符，不同操作系统会适配不同的换行符
import chalk from 'chalk';

const write = process.stdout.write.bind(process.stdout);

export class ProgressBar {
	total: number = 0;
	value: number = 0;
	unit: string = 'Byte';

	constructor() {}

	start(total: number, initValue: number = 0, unit: string = 'Byte') {
		// 初始化数据
		this.total = total;
		this.value = initValue;
		this.unit = unit;
		// 隐藏光标，并保存当前光标位置
		write(ansiEscapes.cursorHide);
		write(ansiEscapes.cursorSavePosition);

		this.render();
	}

	render() {
		let progress = this.value / this.total;

		// 边界处理
		if (progress < 0) {
			progress = 0;
		} else if (progress > 1) {
			progress = 1;
			this.value = this.total;
		}

		// 计算进度条长度
		const barSize = 40; // 总进度条长度
		const completeSize = Math.floor(progress * barSize); // 计算已完成长度
		const incompleteSize = barSize - completeSize; // 剩余长度

		// 渲染进度条
		write(ansiEscapes.cursorRestorePosition);
		write(chalk.green('█'.repeat(completeSize)));
		write('░'.repeat(incompleteSize));
		write(`${this.value} ${this.unit}s / ${this.total} ${this.unit}s`);
	}

	// 更新进度
	update(value: number) {
		this.value = value;

		this.render();
	}

	// 获取总长度
	getTotalSize() {
		return this.total;
	}

	// 停止进度条
	stop() {
		write(ansiEscapes.cursorShow);
		write(EOL);
	}
}
