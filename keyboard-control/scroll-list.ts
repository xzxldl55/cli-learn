import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';
import { BaseUi } from './base-ui.js';

export class ScrollList extends BaseUi {
	curSelectIndex: number = 0; // 当前选中行
	scrollTop: number = 0; // 滚动条位置

	private readonly KEYS = {
		up: () => this.cursorUp(),
		down: () => this.cursorDown(),
	};

	constructor(private list: Array<string> = []) {
		super();

		this.render();
	}

	onKeyInput(name: string) {
		// 非上下键不处理
		if (name !== 'up' && name !== 'down') {
			return;
		}

		const action: Function = this.KEYS[name];
		action();
		this.render();
	}

	cursorUp() {
		this.moveCursor(-1);
	}

	cursorDown() {
		this.moveCursor(1);
	}

	private moveCursor(index: number): void {
		// 移动当前光标位置
		this.curSelectIndex += index;

		// 边界处理
		if (this.curSelectIndex < 0) {
			this.curSelectIndex = 0;
		}
		if (this.curSelectIndex >= this.list.length) {
			this.curSelectIndex = this.list.length - 1;
		}

		// 实现移动效果
		this.fitScroll();
	}

    // 计算滚动条位置，确认是否需要向上/向下滚动
	fitScroll() {
		const shouldScrollUp = this.curSelectIndex < this.scrollTop; // 当前选中行小于滚动条位置
		const shouldScrollDown = this.curSelectIndex > this.scrollTop + this.terminalSize.rows - 1; // 当前选中行大于 【滚动条位置 + 终端行数 - 2】，此时滚动条要进行滚动

		if (shouldScrollUp) {
			this.scrollTop--;
		}
		if (shouldScrollDown) {
			this.scrollTop++;
		}

		this.clear();
	}

	clear() {
		for (let row = 0; row < this.terminalSize.rows; row++) {
			this.clearLine(row); // 逐行清除
		}
	}

	bgRow(text: string) {
		return chalk.bgBlue(text + ' '.repeat(this.terminalSize.columns - text.length));
	}

	render() {
		// 通过计算 scrollTop 和 terminalSize.rows 来获取当前可视列表，仅需渲染可是区域列表数据
		const visibleList = this.list.slice(this.scrollTop, this.scrollTop + this.terminalSize.rows);

		visibleList.forEach((item: string, index: number) => {
			const row = index;

			this.clearLine(row);

			let content = item;

			// 设置选中状态
			if (this.curSelectIndex === this.scrollTop + index) {
                // 先打印整行的背景色，再打印文字（避免了中文字符长度为 2 导致的计算不准确打印多余空白字符的问题）
				this.printAt(chalk.bgBlue(' '.repeat(this.terminalSize.columns)), { x: 0, y: row });
				content = chalk.bgBlue(content) + chalk.red(this.scrollTop) + chalk.green(this.curSelectIndex);
			}

			this.printAt(content, {
				x: 0,
				y: row,
			});
		});

		this.print(ansiEscapes.cursorHide);
	}
}
