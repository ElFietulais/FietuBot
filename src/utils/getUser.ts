import { Guild, GuildMember } from 'discord.js'

export function getUser(guild: Guild, username: string[]) {
	const args = username.join('  ').toLowerCase() || username[0]?.toLowerCase()

	const user = guild.members.cache.find((member: GuildMember) => member.nickname?.toLowerCase() == args || member.user.username.toLowerCase() == args || member.id == args)
	return user?.user
}