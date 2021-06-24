var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		
		const embed = new Discord.MessageEmbed()
			.setTitle(":spoon: Spoonful")
			.setImage("https://cdn.discordapp.com/attachments/724286181855985721/731788243565019186/image0.gif")
			.setColor("#ff3355")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();
			
			msg.channel.send(embed);
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["834518897549508649", "726509180638199888", "725751071254773800"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["spoonful"]
};