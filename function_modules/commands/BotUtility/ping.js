
const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');




module.exports = {

	// Ping Command - Yoshiko2000
	run: async function PingCommand(msg, ping) {


		// You need to do the edit this way BECAUSEEEEE if you don't then it has a chance of not resolving. 
		// Using the .then command will make sure the message is sent with the await function Force Sleep

		const pingEmbedMessage = new Discord.MessageEmbed()
			.setTitle(":alarm_clock: Ping")
			.setDescription("Calculating ping. Please wait...")
			.setColor("#ff3355")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();

		const messageSent = await msg.channel.send(pingEmbedMessage)
			.then(async messageSent => {
				const edittedEmbed = new Discord.MessageEmbed(pingEmbedMessage)
					.setTitle(":alarm_clock: Ping")
					.setDescription(`Ping is ${messageSent.createdTimestamp - msg.createdTimestamp}ms. API Response Time is ${Math.round(imports.bot.ws.ping)}ms`)
					.setColor("#ff3355")
					.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
					.setTimestamp();
					
					//.setTitle(`Ping is ${messageSent.createdTimestamp - msg.createdTimestamp}ms. API Response Time is ${Math.round(imports.bot.ws.ping)}ms`);

				await glofunc.ForceSleep(500);

				if (messageSent) {
					messageSent.edit(edittedEmbed);
				}
			})
			.catch(console.log);

		//const messageSent = await msg.channel.send(pingEmbedMessage);

		//const edittedEmbed = new Discord.MessageEmbed(pingEmbedMessage)
		//	.setTitle(`Ping is ${messageSent.createdTimestamp - msg.createdTimestamp}ms. API Response Time is ${Math.round(imports.bot.ws.ping)}ms`);

		//var pingMessage = `Ping is ${messageSent.createdTimestamp - msg.createdTimestamp}ms. API Response Time is ${Math.round(imports.bot.ws.ping)}ms`;

		//const messageSentNew = await msg.channel.send(edittedEmbed);

		//messageSent.delete().catch(exception => { });

		// below is the previous way... that had issues


		


	


	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["ping"]


};



