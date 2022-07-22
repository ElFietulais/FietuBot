import type { GuildMember, Message } from "discord.js";

export async function getUser(message: Message, username: string[]) {
	const mention = message.mentions.users.first();
	if (mention) return mention;
	const args = (username.join("  ") || username[0])?.toLowerCase();
	const argsUser = (member: GuildMember) =>
		(member.nickname || member.user.username).toLowerCase() || member.id;

	const member = message.guild?.members.cache.find(
		(member: GuildMember) => argsUser(member) === args
	);

	if (member) {
		const fetch = await message.guild?.members.fetch(member.id);
		if (fetch) return fetch.user;
	}
	return message.author;
}
