/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { Client, Message } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { Command } from '../../classes/Command'
import { getUser } from '../../utils/getUser'

export default class Avatar extends Command {
	public constructor() {
		super({
			data: {
				name: 'avatar',
				description: 'avatar of user',
				aliases: ['av'],
				botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS' ]
			},
			async run(client: Client, message: Message, args: string[]) {

				let user = getUser(message.guild!, args)
				if(!user) user = message.mentions.users.first() || message.author

				if(!user.avatar) return message.channel.send(' > :x: User has no avatar')

				const embed = new MessageEmbed()
					.setTitle(`${user.username} Avatar`)
					.setDescription(`[Avatar Url](${user.displayAvatarURL()})`)
					.setImage(user.displayAvatarURL({ size: 1024 }))

				message.channel.send({ embeds: [embed]})

			}
		})
	}
}