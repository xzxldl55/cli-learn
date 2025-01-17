[doc]

# NodeJS Cli相关知识学习

## 1. ANSI 字符控制命令行

国际统一标准适用 ANSI 字符控制命令行光标，擦除，颜色等的操作。

[可参考ANSI字符](https://www2.ccs.neu.edu/research/gpc/VonaUtils/vona/terminal/vtansi.htm)

## 2. node 原生自带的光标控制 readline 模块

[可参考readline](https://nodejs.org/api/readline.html)

## 3. 更进一步光标控制模块 ansi-escapes 和 sisteransi

封装了 cursor 位置的方法，擦除终端内容的方法

[可参考ansi-escapes](https://github.com/sindresorhus/ansi-escapes)

sisteransi也是光标控制的库，提供了差不多的方法

[可参考sisteransi](https://github.com/sindresorhus/sisteransi)

## 4. 颜色控制模块 chalk 和 ansi-colors

chalk封装了 ASCII 码的颜色控制字符，使用链式调用来配置前景/背景/加粗/下划线等选项

[可参考chalk](https://github.com/chalk/chalk)

也可以使用 ansi 系列颜色，ansi-colors

[可参考ansi-colors](https://github.com/doowb/ansi-colors)

## 5. 键盘控制

[键盘控制](./keyboard-control/index.ts)

## 6. prompts

通过对话与提示词，来与用户进行交互，确认数据选择

[可参考通用库 prompts](https://github.com/terkelg/prompts)
