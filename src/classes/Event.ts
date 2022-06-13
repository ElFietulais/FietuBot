import type { Client } from 'discord.js'

export class Events {
	constructor (options: {
    // eslint-disable-next-line
		run: (client: Client, ...args: any[]) => void;
  }) {
		this.run = options.run
	}
	// eslint-disable-next-line
	run: (client: Client, ...args: any[]) => void
}
