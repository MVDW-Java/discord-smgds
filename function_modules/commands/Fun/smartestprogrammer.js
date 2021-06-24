const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		msg.delete();
		msg.channel.send("https://cdn.discordapp.com/attachments/724286181855985721/753339975008780348/The_smartest_programmer_who_has_ever_lived.mp4");
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["smartestprogrammer"]
};
