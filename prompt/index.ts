import { prompt, PromptOptions } from './run-prompt.js';

const quest: PromptOptions[] = [
	{
		type: 'text',
		name: 'name',
		message: '请输入你的名字',
		placeholder: '请输入你的名字',
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
];
(async function () {
	const answers = await prompt(quest);
	console.log(answers);
})();
