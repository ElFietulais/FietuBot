/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Client, Message } from "discord.js";
import { Events } from "#lib/structures";

export default class MessageCreate extends Events {
	public constructor() {
		super({
			async run(client: Client, message: Message) {
				if (!message.guild) return;
				if (message.author.bot) return;
				if (!message.content.startsWith(client.prefix)) return;
				if (message.content === client.prefix) return;

				const args = message.content
					.slice(client.prefix.length)
					.split(/ +/);
				if (!args) {
					return;
				}

				const cmd = args.shift()!.toLowerCase();

				const command =
					client.commands.get(cmd) ||
					client.commands.find((command) =>
						command.data.aliases!.includes(cmd)
					);
				if (!command) return;

				if (
					command.data.botPermissions &&
					!message.guild?.members.me?.permissions.has(
						command.data.botPermissions
					)
				)
					return message.channel.send(
						` > :x:  I need permission: \`${command.data.botPermissions}\`, to use this command!`
					);

				if (
					command.data.userPermissions &&
					!message.member?.permissions.has(
						command.data.userPermissions
					)
				)
					return message.channel.send(
						` > :x:  You need permission: \`${command.data.userPermissions}\`, to use this command!`
					);

				if (
					command.data.devOnly &&
					message.author.id !== "780876656352559125"
				)
					return message.channel.send(
						" > :x:  This command is only for developers!"
					);

				try {
					command.run({ client, message, args });
				} catch (error) {
					console.error(error);
					await message.channel.send("An error occured!");
				}
				return null;
			},
		});
	}
}
