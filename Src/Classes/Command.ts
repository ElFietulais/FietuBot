import type { Client, Message } from 'discord.js'

export abstract class Command {
	constructor (options: {
    data: {
      name: string;
    };
    run: (client: Client, message: Message, args: string[]) => void;
  }) {
		this.data = options.data
		this.run = options.run
	}

	data: {
    name: string;
  }

	run: (client: Client, message: Message, args: string[]) => void
}
