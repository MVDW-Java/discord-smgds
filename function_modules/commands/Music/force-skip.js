const globalVars = require('../../../globalvars');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");

module.exports = {

	run: async function SimpleCommand(msg, args) {
		
		const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		
		if (!msg.member.voice.channel){
			msg.channel.send(':no_entry_sign: You have to be in a voice channel to stop the music!');
			return;
		}
		if (serverQueue["songs"].length == 0){
			msg.channel.send(':no_entry_sign: There is no song that I could skip!');
			return;
		}
		if(globalVars.MusicLoop){
			globalVars.MusicLoop = false;
			msg.channel.send(":repeat_one: Loop removed.");
		}
		
		
		msg.channel.send(":track_next: Skipping song...");
		globalVars.audioPlayer.stop();


	},
	ModuleType: "command",
	Permissions: 1,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["forceskip", "fs"]


};
