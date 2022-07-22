import type {
	Client,
	Collection,
	Message,
	PermissionResolvable,
} from "discord.js";

export interface TextCommandExecution {
	client?: Client;
	message: Message;
	args: string[];
}
export interface commandType {
	data: {
		name: string;
		description: string;
		aliases?: string[];
		botPermissions?: PermissionResolvable[];
		userPermissions?: PermissionResolvable[];
		devOnly?: boolean;
	};
	run: ({ client, message, args }: TextCommandExecution) => void;
}

declare module "discord.js" {
	interface Client {
		readonly commands: Collection<string, commandType>;
		readonly prefix: string;
	}
}
