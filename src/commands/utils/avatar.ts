import { EmbedBuilder } from "discord.js";
import { Command } from "#lib/structures";
import { getUser } from "#utils/getUser";

export default class Avatar extends Command {
	public constructor() {
		super({
			data: {
				name: "avatar",
				description: "avatar of user",
				aliases: ["av"],
				botPermissions: ["SendMessages", "EmbedLinks"],
				devOnly: false,
			},

			run: async ({ message, args }) => {
				const user = await getUser(message, args);

				const avatar = user.displayAvatarURL({ size: 1024 });
				if (!avatar)
					return message.channel.send(" > :x: User has no avatar");

				const embed = new EmbedBuilder()
					.setTitle(`${user.username} Avatar`)
					.setDescription(`[Avatar Url](${user.displayAvatarURL()})`)
					.setImage(user.displayAvatarURL({ size: 1024 }));

				return message.channel.send({ embeds: [embed] });
			},
		});
	}
}
