import ansiEscapes from 'ansi-escapes';

export interface Position {
	x: number;
	y: number;
}

// 基础UI抽象类
export abstract class BaseUi {
	private readonly stdout: NodeJS.WriteStream = process.stdout;
	constructor() {}

	// 输出字符串到“当前”命令行
	protected print(text: string) {
		this.stdout.write(text);
	}

	// 设置光标位置
	protected setCursorAt({ x, y }: Position) {
		this.print(ansiEscapes.cursorTo(x, y));
	}

	// 输出字符串到指定位置
	protected printAt(message: string, position: Position) {
		this.setCursorAt(position);
		this.print(message);
	}

	// 擦除某行
	protected clearLine(row: number) {
		// ansiEscapes.eraseLine 擦除当前行
		this.printAt(ansiEscapes.eraseLine, { x: 0, y: row });
	}

    // 返回当前命令行大小
	get terminalSize(): { columns: number; rows: number } {
		return {
			columns: this.stdout.columns,
			rows: this.stdout.rows,
		};
	}

    abstract render(): void;
}
