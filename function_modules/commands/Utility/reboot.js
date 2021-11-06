var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		msg.channel.send(":mobile_phone_off: **Rebooting...** *This can take maximum of 10 seconds.*").then(() => {
			process.exit(1);
		})
	},
	ModuleType: "command",
	Permissions: 9,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["reboot", "restart"]
};