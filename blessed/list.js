import blessed from 'blessed';

// Blessed中 screen 是根组件，所有的小组件都要由 screen.append 来添加
const screen = blessed.screen({
	fullUnicode: true, // 启用完整的 Unicode 支持，支持显示中文字符，组合字符等
});

const data = [
	'红楼梦',
	'三国演义',
	'水浒传',
	'西游记',
	'聊斋志异',
	'儒林外史',
	'官场现形记',
	'二十年目睹之怪现状',
	'老残游记',
	'孽海花',
	'镜花缘',
	'封神演义',
	'三侠五义',
	'七侠五义',
	'三言二拍',
	'金瓶梅',
];

const list = blessed.list({
	width: '60%',
	height: '60%',
    right: 0, // 定位：这里定位到右下角
    bottom: 0,
    label: '书籍列表', // 标题
	border: 'line',
	align: 'left',
	keys: true, // 启用键盘支持
    mouse: true, // 启用鼠标支持
	style: {
		fg: 'white', // 前景色
		bg: 'default', // 背景色
		selected: {
			bg: 'blue', // 选中背景色
		},
	},
	items: data,
});
const list2 = blessed.list({
    width: '40%',
	height: '100%',
    left: 0,
    bottom: 0,
    label: '书籍列表2', // 标题
	border: 'line',
	align: 'left',
	keys: true, // 启用键盘支持
    mouse: true, // 启用鼠标支持
	style: {
		fg: 'white', // 前景色
		bg: 'default', // 背景色
		selected: {
			bg: 'blue', // 选中背景色
		},
	},
	items: data,
})

screen.append(list); // 将列表添加到屏幕中
screen.append(list2);

list.select(0); // 选中第一个元素

// 监听选中事件
list.on('select', (item) => {
	screen.destroy();

	console.log(item.getText());
});

list2.on('select', (item) => {
    screen.destroy();
	console.log(item.getText());
});

// 处理键盘 Control + c 事件
screen.key('C-c', () => {
	screen.destroy();
})

list.focus();

screen.render(); // 渲染组件
