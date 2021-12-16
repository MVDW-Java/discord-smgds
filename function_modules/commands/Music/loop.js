const globalVars = require('../../../globalvars');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");

module.exports = {

	run: async function SimpleCommand(msg, args) {
		const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		if (!serverQueue){
			msg.channel.send('There is nothing playing right now.');
			return;
		}
		if(globalVars.music_djonly && msg.author.id !== "481895822624161795"){
			msg.channel.send(":lock: Sorry, DJ only is ``enabled``, you can't do any music related commands.");
			return;
		}

		if(globalVars.MusicLoop){
			globalVars.MusicLoop = false;
			msg.channel.send("Loop removed.");
		} else {
			globalVars.MusicLoop = true;
			const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
			msg.channel.send(":repeat_one: Song ``" + globalVars.MusicQueue.get(msg.guild.id)["songs"][0]["title"] + "`` looped.");
		}
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["loop"]


};
