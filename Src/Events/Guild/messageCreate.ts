import type { Client, Message } from 'discord.js'

import { Events } from '../../Classes/Event'

export default class MessageCreate extends Events {
	public constructor () {
		super({
			async run (client: Client, message: Message) {
				if (!message.content.startsWith(client.prefix)) { return }

				if (message.content === client.prefix) { return }

				if (message.author.bot) { return }

				const args = message.content.slice(client.prefix.length).split(/ +/)
				if (!args) { return }

				// eslint-disable-next-line
				const cmd = args.shift()!.toLowerCase()

				const command = client.commands.get(cmd)
				if (!command) { return }

				try {
					await command.run(client, message, args)
				} catch (error) {
					if (error instanceof Error) {
						console.error(error)
						message.channel.send('An error occured!')
					}
				}
			}
		})
	}
}
