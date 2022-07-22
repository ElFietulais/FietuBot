/* eslint-disable @typescript-eslint/member-ordering */
import type { PermissionResolvable } from "discord.js";
import type { TextCommandExecution } from "types";

export abstract class Command {
	public constructor(options: {
		data: {
			name: string;
			description: string;
			aliases?: string[];
			botPermissions?: PermissionResolvable[];
			userPermissions?: PermissionResolvable[];
			devOnly?: boolean;
		};
		run: ({ client, message, args }: TextCommandExecution) => void;
	}) {
		this.data = options.data;
		this.run = options.run;
	}

	public data: {
		name: string;
		description: string;
		aliases?: string[];
		botPermissions?: PermissionResolvable[];
		userPermissions?: PermissionResolvable[];
		devOnly?: boolean;
	};

	public run: ({ client, message, args }: TextCommandExecution) => void;
}
