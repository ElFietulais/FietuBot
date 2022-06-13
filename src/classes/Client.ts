/* eslint-disable  @typescript-eslint/no-explicit-any */

import 'dotenv/config'
import { Client, Collection } from 'discord.js'

import { CommandHandler } from '../handlers/Commands'
import { EventHandler } from '../handlers/Events'

export class Bot extends Client {
	public override commands: Collection<string, any> = new Collection()

	public override prefix: '!'

	public constructor () {
		super({
			intents: [515]
		})

		this.commands = new Collection()
		this.prefix = '!'
	}

	async start () {
		CommandHandler(this)
		EventHandler(this)
		await super.login(process.env.TOKEN)
	}
}

declare module 'discord.js' {
  export interface Client {
		readonly commands: Collection<string, any>
    readonly prefix: '!';
  }
}
