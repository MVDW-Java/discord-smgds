const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const Discord = require('discord.js');


module.exports = {

	run: async function SimpleCommand(msg, args) {
		msg.channel.send("Leaving..");
		serverQueue.connection.dispatcher.end();
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["leave", "stop", "fuckoff"]


};