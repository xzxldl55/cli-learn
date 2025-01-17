import chalk from 'chalk';

const log = console.log.bind(console);

log(chalk.red('Hello') + ' world' + chalk.blue('!'));
log(chalk.blue.bgRed.bold('Hello world!'));
log(chalk.blue('hello', 'world', 'foo', 'bar', 'biz')); // 多参数自动拼接
log(chalk.red('Hello', chalk.underline.bgBlue('world'), '!'))
log(chalk.green(
    'I\'m a green line' + chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
))
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}    
`)
log(chalk.rgb(123, 45, 67).underline('自定义颜色'))
log(chalk.hex('#ff6a00').bold('自定义颜色ABK'))