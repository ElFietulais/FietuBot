import type { Client, Message } from 'discord.js'
import { Command } from '../../Classes/Command'

export default class Ping extends Command {
	public constructor () {
		super({
			data: {
				name: 'ping',
				description: 'Pong!',
				botPermissions: [ 'SEND_MESSAGES' ],
				userPermissions: [ 'BAN_MEMBERS' ]
			},
			run (client: Client, message: Message) {
				message.channel.send(`Pong! ${client.ws.ping}ms`)
			}
		})
	}
}
