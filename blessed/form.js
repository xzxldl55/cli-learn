import blessed from 'blessed';

const screen = blessed.screen({
	fullUnicode: true,
});

const form = blessed.prompt({
	parent: screen, // 可以直接指定为 screen 子元素，这同等于 screen.append(form)
	border: 'line',
	height: 'shrink', // 高度随内容变化
	width: 'half',
	top: 'center',
	left: 'center',
	label: ' {green-fg}登录{/green-fg} ', // 使用 {}Text{/} 来设置标题的颜色样式
	tags: true,
});

const msg = blessed.message({
	parent: screen,
	border: 'line',
	width: 'half',
	height: 'shrink',
	top: 'center',
	left: 'center',
	label: ' {blue-fg}提示{/blue-fg} ',
	tags: true,
	hidden: true, // 默认隐藏
});

// 使用 form 组件渲染 input 组件
form.input('请输入用户名:', '', function (err, username) {
    // 用户名输入完毕后，渲染密码输入组件
	form.input('请输入密码:', '', function (err, password) {
		if (username === 'xzxldl' && password === '123') {
			msg.display('登录成功', 1); // 显示消息，1 秒后隐藏
		} else {
			msg.display('登录失败，用户名或密码错误', 1);
		}

		setTimeout(() => {
			screen.destroy();

			console.log(username, ' - ', password);
		}, 1000);
	});
});

screen.key('C-c', () => {
	screen.destroy();
});

screen.render();
