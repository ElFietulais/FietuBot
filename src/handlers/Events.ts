/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Client } from "discord.js";
import { readdirSync } from "fs";

export function EventHandler(client: Client) {
	readdirSync("./dist/events/").forEach(async (dir) => {
		const events = readdirSync(`./dist/events/${dir}/`).filter((file) =>
			file.endsWith(".js")
		);
		for (const files of events) {
			const evnt = await import(`../events/${dir}/${files}`);
			const event = new evnt.default();
			const eventName = files.split(".")[0]!;
			client.on(eventName, (...args: any[]) =>
				event.run(client, ...args)
			);
		}
	});
}
