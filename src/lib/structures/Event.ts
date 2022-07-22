/* eslint-disable @typescript-eslint/member-ordering */
import type { Client } from "discord.js";

export class Events {
	public constructor(options: {
		run: (client: Client, ...args: any[]) => void;
	}) {
		this.run = options.run;
	}

	public run: (client: Client, ...args: any[]) => void;
}
