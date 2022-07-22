import type { Client } from "discord.js";
import { readdirSync } from "fs";

export function CommandHandler(client: Client) {
	readdirSync("./dist/commands/").forEach(async (dir) => {
		const commands = readdirSync(`./dist/commands/${dir}/`).filter((file) =>
			file.endsWith(".js")
		);
		for (const files of commands) {
			const cmd = await import(`../commands/${dir}/${files}`);
			const command = new cmd.default();
			client.commands.set(command.data.name, command);
		}
	});
}
