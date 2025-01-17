import ansiEscapes from 'ansi-escapes'

// 适用 process.stdout.write 不会自动换行（console.log 会）
const log = process.stdout.write.bind(process.stdout);

/**
 * ansiEscapes.cursorTo(x, y) 移动到第 x 列，第 y 行
 * ansiEscapes.cursorMove(x, y) 以当前光标位置为基准，行方向移动 y 行，列方向移动 x 列
 */
log(ansiEscapes.cursorTo(10, 1) + '111'); // 移动到第一行，第 10 列，接着打印 111
log(ansiEscapes.cursorTo(7, 2) + '222'); // 移动到第二行，第 7 列，接着打印 222
log(ansiEscapes.cursorTo(5, 3) + '333'); // 移动到第三行，第 5 列，接着打印 333

setTimeout(() => {
    log(ansiEscapes.cursorTo(0, 2) + ansiEscapes.eraseEndLine); // 移动到第二行，第 0 列，接着擦除第二行剩余内容
    log(ansiEscapes.cursorTo(5, 3) + '444') // 移动到第三行，第 5 列，接着打印 444
}, 1000);
