var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		msg.channel.send("Rebooting... Back in 10 seconds!").then(() => {
			process.exit(1);
		})
	},
	ModuleType: "command",
	Permissions: 9,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["reboot", "restart"]
};