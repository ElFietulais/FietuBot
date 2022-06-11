import type { Client } from 'discord.js'
import { readdirSync } from 'fs'

export function EventHandler (client: Client) {
	readdirSync('./Src/Events/').forEach(async (dir) => {
		const events = readdirSync(`./Src/Events/${dir}/`).filter(file => file.endsWith('.ts'))
		for (const files of events) {
			const evnt = await import(`../Events/${dir}/${files}`)
			const event = new evnt.default()
			const eventName = files.split('.')[0]
			// eslint-disable-next-line
			client.on(eventName!, (...args: any[]) => event.run(client, ...args))
		}
	})
}
