const globalVars = require('../../../globalvars');
const glofunc = require('../../../globalfunctions');


module.exports = {

	run: async function SimpleCommand(msg, args) {
		
		const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		
		if(globalVars.music_djonly && msg.author.id !== "481895822624161795"){
			msg.channel.send(":lock: Sorry, DJ only is ``enabled``, you can't do any music related commands.");
			return;
		}
		
		if (!msg.member.voice.channel){
			msg.channel.send(':no_entry_sign: You have to be in a voice channel to stop the music!');
			return;
		}
		if (serverQueue["songs"].length == 0){
			msg.channel.send(':no_entry_sign: There is no song that I could skip!');
			return;
		}
		
		var member_size_required = Math.round((serverQueue.voiceChannel.members.size - 1) / 2);
		
		
		
		if(globalVars.vote_skip_song.includes(msg.author.id)){
			msg.channel.send(":no_entry_sign: You already voted. ``" + globalVars.vote_skip_song.length + "/" + member_size_required  + "``");
			return;
		}
		globalVars.vote_skip_song.push(msg.author.id);
		
		
		
		
		
		if(globalVars.vote_skip_song.length < member_size_required){
			msg.channel.send(":fast_forward: " + globalVars.vote_skip_song.length + "/" + member_size_required + " votes to skip.");
		} else {
			if(globalVars.MusicLoop){
				globalVars.MusicLoop = false;
				msg.channel.send(":repeat_one: Loop removed.");
			}
			
			
			msg.channel.send(":track_next: Skipping song...");
			globalVars.audioPlayer.stop();
		}
		


	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["skip", "s"]


};
