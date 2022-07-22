import { Bot } from "#lib/structures";

const main = async () => {
	const client = new Bot();
	try {
		await client.start();
	} catch (err) {
		console.log(err);
	}
};

void main();
