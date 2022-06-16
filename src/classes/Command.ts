import type { Client, Message, PermissionString} from 'discord.js'

export abstract class Command {
	constructor (options: {
    data: {
      name: string;
      description: string;
      aliases?: string[];
      botPermissions?: PermissionString[];
      userPermissions?: PermissionString[];
      devOnly?: boolean;
    };
    run: (client: Client, message: Message, args: string[]) => void;
  }) {
		this.data = options.data
		this.run = options.run
	}

	data: {
    name: string;
    description: string;
    aliases?: string[];
    botPermissions?: PermissionString[];
    userPermissions?: PermissionString[];
    devOnly?: boolean;
  }

	run: (client: Client, message: Message, args: string[]) => void
}
