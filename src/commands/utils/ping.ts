import { Command } from "#lib/structures";

export default class Ping extends Command {
	public constructor() {
		super({
			data: {
				name: "ping",
				description: "Pong!",
				botPermissions: ["SendMessages"],
				devOnly: false,
			},
			run: async ({ client, message }) => {
				return message.channel.send(
					`Pong! ${Math.round(client!.ws.ping)}ms`
				);
			},
		});
	}
}
