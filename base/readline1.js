/**
 * 清空命令行输出，并移动光标到最上面
 */
import readline from 'node:readline'

function clearScreen() {
    const repeatCount = process.stdout.rows - 2; // 获取当前终端的行数（这里 - 2用来额外显示当前命令行）
    const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : ''; // 根据终端可显示行数，生成这么多空行
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
}

clearScreen();