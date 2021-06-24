const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const vars = require('../../../globalvars');

module.exports = {

	run: async function SimpleCommand(msg, args) {
		
		
		const serverQueue = imports.MusicQueue.get(msg.guild.id);
		
		
		if (!msg.member.voice.channel){
			msg.channel.send(':no_entry_sign: You have to be in a voice channel to stop the music!');
			return;
		}
		if (!serverQueue){
			msg.channel.send(':no_entry_sign: There is no song that I could skip!');
			return;
		}
		
		var member_size_required = Math.round((serverQueue.voiceChannel.members.size - 1) / 2);
		
		
		
		if(vars.vote_skip_song.includes(msg.author.id)){
			msg.channel.send(":no_entry_sign: You already voted. ``" + vars.vote_skip_song.length + "/" + member_size_required  + "``");
			return;
		}
		vars.vote_skip_song.push(msg.author.id);
		
		
		
		
		
		if(vars.vote_skip_song.length < member_size_required){
			msg.channel.send(":fast_forward: " + vars.vote_skip_song.length + "/" + member_size_required + " votes to skip.");
		} else {
			if(imports.MusicLoop){
				imports.MusicLoop = false;
				msg.channel.send(":repeat_one: Loop removed.");
			}
			
			
			msg.channel.send(":track_next: Skipping song...");
			vars.dispatcher.end();
		}
		


	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["skip", "s"]


};