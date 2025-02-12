// Prompt 运行
import { SelectPrompt, SelectPromptOptions } from './select-prompt.js';
import { TextPrompt, TextPromptOptions } from './text-prompt.js';

export type PromptOptions = TextPromptOptions | SelectPromptOptions;

const map: Record<string, any> = {
	text: TextPrompt,
	select: SelectPrompt,
};

async function runPrompt(quest: PromptOptions) {
	const promptClass = map[quest.type];

	// 如果 Prompt 类型不存在，则返回 null
	if (!promptClass) {
		return null;
	}

	return new Promise((resolve) => {
		const prompt = new promptClass(quest); // 创建对应的 Prompt 实例
		prompt.render();
		prompt.on('submit', (value: string) => {
			resolve(value);
		});
	});
}

export async function prompt(quest: PromptOptions[]) {
	const answers: Record<string, any> = {};

	for (let i = 0; i < quest.length; i++) {
		const name = quest[i].name;

		answers[name] = await runPrompt(quest[i]);
	}

	return answers;
}
