import FileSaver from "file-saver";

import surpriseMePrompts from "../surprise-me/surpriseMePrompts";

const getRandomPrompt = (prompt) => {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	// Making sure we don't get the same prompt multiple times in a row
	if (randomPrompt === prompt) return getRandomPrompt(prompt);

	return randomPrompt;
};

const downloadImage = (_id, photo) => {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
};

export { getRandomPrompt, downloadImage };
