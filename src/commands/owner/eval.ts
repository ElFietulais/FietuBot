import type { Client, Message } from 'discord.js'
import { MessageEmbed, Formatters } from 'discord.js'
import { Command } from '../../classes/Command'
import { promisify, inspect } from 'node:util'
import { exec } from 'node:child_process'

export default class Eval extends Command {
	public constructor() {
		super({
			data: {
				name: 'eval',
				description: 'evaluates code',
				aliases: ['e', 'ev'],
				botPermissions: ['SEND_MESSAGES'],
				devOnly: true
			},
			async run(client: Client, message: Message, args: string[]) {

				if(!args) return message.channel.send(' > :x: No code provided')

				const words = ['destroy', 'env', 'token']
				if(words.some((word) => args.includes(word))) return message.channel.send(' > :x: You cannot use these words in this command!')

				const code = args.slice(1).join(' ')
				let msg = undefined

				try {
					switch(args[0]) {
					case '-c': {
						console.log(await eval(code))
						msg = 'Evaluated code'
						break
					}
					case '-ex' : {
						const { stdout, stderr } = await promisify(exec)(code)
        
						if(!stdout && !stderr) return message.channel.send(' > :x: No output')
                            
						if(stdout) msg = `Output: ${Formatters.codeBlock('js', stdout)}`
        
						if(stderr) msg = `Error: ${Formatters.codeBlock('js', stderr)}`
        
						break
                            
					}
                        
					case '-r': {
						return message.channel.send(`Output: ${inspect(await eval(code), { depth: 0 })}`)
						break
					}

					case '-s' : {
						msg = `Output: ${Formatters.codeBlock('js', inspect(await eval(code), { depth: 0 }))}`
						break
					}
        
					}
				} catch(e) {
					msg = `Error: ${e}`
				}


				if(!msg) return message.channel.send(' > :x: No output')

				if(msg.length > 1950) msg = msg.slice(0, 1950)

				msg = `Input: ${Formatters.codeBlock('js', code)}\n\n${msg}`
                
				const embed = new MessageEmbed()
					.setTitle('Eval')
					.setDescription(msg)
					.setColor('#00ff00')

                
				message.channel.send({ embeds: [embed]})
			}
		})
	}
}