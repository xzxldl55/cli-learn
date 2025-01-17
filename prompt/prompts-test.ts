import prompts, { PromptObject } from 'prompts';

(async function () {
	const questions: PromptObject[] = [
		{
			type: 'text', // 类型
			name: 'name', // 字段名称
			message: '请输入你的名字', // 提示信息
			initial: 'xzxldl', // 初始值
		},
		{
			type: 'number',
			name: 'age',
			message: '请输入你的年龄',
			validate: (value) => (value < 18 ? '未满 18 退回！' : true),
		},
		{
			type: 'password',
			name: 'password',
			message: '设置密码',
		},
		{
			type: 'confirm',
			name: 'confirm',
			message: '是否确认？',
		},
		{
            type: 'toggle',
            name: 'sex',
            message: '选择您的性别',
            active: '男',
            inactive: '女',
        },
        {
			type: 'select',
			name: 'color',
			message: '选择您喜欢的颜色',
			choices: [
				{ title: '红色', description: '红色描述', value: 'red' },
				{ title: '绿色', description: '绿色描述', value: 'green' },
				{ title: '蓝色', description: '蓝色描述', value: 'blue' },
                { title: '黄色', description: '黄色描述', value: 'yellow' },
			],
		},
        {
			type: 'multiselect',
			name: 'dislikeColor',
			message: '选择您不喜欢的颜色（可多选）',
			choices: [
				{ title: '红色', description: '红色描述', value: 'red' },
				{ title: '绿色', description: '绿色描述', value: 'green' },
				{ title: '蓝色', description: '蓝色描述', value: 'blue' },
				{ title: '黄色', description: '黄色描述', value: 'yellow' },
			],
		},
        {
            type: 'date',
            name: 'birthday',
            message: '请输入您的生日',
            validate: date => date > Date.now() ? '不能设置未来的日期' : true
        }
	];

	const result = await prompts(questions);
	console.log(result);
})();
