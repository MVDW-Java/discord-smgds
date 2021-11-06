const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const Discord = require('discord.js');


module.exports = {

	run: async function SimpleCommand(msg, args) {
		msg.channel.send("Leaving..");
		msg.channel.send(":warning: Due the recode this function is not ready yet.");
		//serverQueue.connection.dispatcher.end();
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["leave", "stop", "fuckoff"]


};