const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const Discord = require('discord.js');


module.exports = {

	run: async function SimpleCommand(msg, args) {
		msg.channel.send("Seeking..");
		msg.channel.send("[DEBUG MODE] : args[0]=" + args[0]);
		
		var a = args[0].split(':'); // split it at the colons
		var seconds = 0;
		if(a.length == 0){
			msg.channel.send("Please use a vailid time format(Example: 1:42)");
			return;
		} else if(a.length == 1){
			seconds = (a[0]); 
		} else if(a.length == 2){
			seconds = (+a[0]) * 60 + (+a[1]); 
		} else if(a.length == 3){
			seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
		}
		
		
		
		const serverQueue = imports.MusicQueue.get(msg.guild.id);
		vars.dispatcher = serverQueue.connection.play(imports.MusicQueue.get(msg.guild.id)["songs"][0].url, {seek: parseInt(seconds)})

	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["seek"]


};