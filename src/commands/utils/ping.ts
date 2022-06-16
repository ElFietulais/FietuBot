import type { Client, Message } from 'discord.js'
import { Command } from '../../classes/Command'

export default class Ping extends Command {
	public constructor () {
		super({
			data: {
				name: 'ping',
				description: 'Pong!',
				botPermissions: [ 'SEND_MESSAGES' ],
				devOnly: false
			},
			run (client: Client, message: Message) {
				message.channel.send(`Pong! ${client.ws.ping}ms`)
			}
		})
	}
}
