import type { Client } from "discord.js";
import { Events } from "../../lib/structures/Event.js";

export default class Ready extends Events {
	public constructor() {
		super({
			run(client: Client) {
				console.log(`${client.user?.username} is online!`);
			},
		});
	}
}
