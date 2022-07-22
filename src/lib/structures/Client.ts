import "dotenv/config";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { CommandHandler } from "../../handlers/Commands.js";
import { EventHandler } from "../../handlers/Events.js";
import type { commandType } from "types";

export class Bot extends Client {
	public override commands: Collection<string, commandType> =
		new Collection();

	public override prefix: "f!";

	public constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
			],
			partials: [
				Partials.Message,
				Partials.GuildMember,
				Partials.Channel,
				Partials.User,
			],
		});

		this.commands = new Collection();
		this.prefix = "f!";
	}

	public async start() {
		CommandHandler(this);
		EventHandler(this);
		await super.login(process.env.TOKEN);
	}
}
