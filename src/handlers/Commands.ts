import type { Client } from 'discord.js'
import { readdirSync } from 'fs'

export function CommandHandler (client: Client) {
	readdirSync('./src/commands/').forEach(async (dir) => {
		const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.ts'))
		for (const files of commands) {
			const cmd = await import(`../commands/${dir}/${files}`)
			const command = new cmd.default()
			client.commands.set(command.data.name, command)
		}
	})
}
