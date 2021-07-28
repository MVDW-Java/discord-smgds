
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

		const messageSent = msg.channel.send(pingEmbedMessage)
			.then(async messageSent => {
				var discord_reaction_ms = messageSent.createdTimestamp - msg.createdTimestamp;
				var discord_reaction_msg = "Latency is average.";
				var discord_reaction_indicator = ":green_circle:";
				
				var discord_ping_ms = Math.round(imports.bot.ws.ping);
				var discord_ping_msg = "Latency is average.";
				var discord_ping_indicator = ":green_circle:";
				
				
				
				if(discord_reaction_ms > 100){
					discord_reaction_msg = "Latency is a bit slower than usual.";
					discord_reaction_indicator = ":yellow_circle:";
				} else if(discord_reaction_ms > 500){
					discord_reaction_msg = "Latency is slow, music will stutter.";
					discord_reaction_indicator = ":orange_circle:";
				} else if(discord_reaction_ms > 1000){
					discord_reaction_msg = " Latency is really slow, Discord has minor issues.";
					discord_reaction_indicator = ":red_circle:";
				} else if(discord_reaction_ms > 1000){
					discord_reaction_msg = "Latency is bad, Expect an outage.";
					discord_reaction_indicator = ":black_circle:";
				}
				
				if(discord_ping_ms > 100){
					discord_ping_msg = "Latency is a bit slower than usual.";
					discord_ping_indicator = ":yellow_circle:";
				} else if(discord_ping_ms > 200){
					discord_ping_msg = "Latency is slow, music will stutter.";
					discord_ping_indicator = ":orange_circle:";
				} else if(discord_ping_ms > 500){
					discord_ping_msg = "Latency is really slow, Discord has minor issues.";
					discord_ping_indicator = ":red_circle:";
				} else if(discord_ping_ms > 1000){
					discord_ping_msg = "Latency is bad, Expect an outage.";
					discord_ping_indicator = ":black_circle:";
				}
				
				var description = "Results are in:\n\n" +
					discord_reaction_indicator + " Discord reaction: " + discord_reaction_ms + "ms - " + discord_reaction_msg + "\n" +
					discord_ping_indicator + " Discord API: " + discord_ping_ms + "ms - " + discord_ping_msg + "\n" +
					":white_circle: YouTube API: ???ms - Module not finished.\n" + 
					":white_circle: ProjectVideo ping: ???ms - Module not finished.\n";
				console.log(description);
				
				await glofunc.ForceSleep(1000);
				
				if (messageSent) {
					msg.channel.send("if this message triggers its not empty: " + messageSent.id);
					messageSent.edit(new Discord.MessageEmbed(pingEmbedMessage).setDescription(description));
				}
					//.setTitle(`Ping is ${messageSent.createdTimestamp - msg.createdTimestamp}ms. API Response Time is ${Math.round(imports.bot.ws.ping)}ms`);

				//await glofunc.ForceSleep(1000);
//
				//if (messageSent) {
				//	//messageSent.edit(edittedEmbed);
				//}
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
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["ping"]


};



