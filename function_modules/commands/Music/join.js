var glofunc = require('../../../globalfunctions');
const globalVars = require('../../../globalvars');

module.exports = {

	run: async function SimpleCommand(msg, args) {
		
		msg.channel.send(":warning: Due the recode this function is not ready yet.");
		return;
		
		var song;
		const voiceChannel = msg.member.voice.channel;
		
		if (!voiceChannel) {
			msg.channel.send("You need to be in a voice channel to play music!");
			return;
		}

		const permissions = voiceChannel.permissionsFor(msg.client.user);

		if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
			msg.channel.send("I need the permissions to join and speak in your voice channel!");
			return;
		}
		
		
		



		if (!globalVars.MusicQueue.get(msg.guild.id)) {
			const queueContruct = {
				textChannel: msg.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 50,
				playing: true,
			};
			
			globalVars.MusicQueue.set(msg.guild.id, queueContruct);
			
			
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			glofunc.PlaySong(msg.guild, null);
			
			msg.channel.send("Music log linked to <#" + globalVars.MusicQueue.get(msg.guild.id).textChannel.id + ">.");
			
		} else {
			msg.channel.send("Sorry, But I am already linked to <#" + globalVars.MusicQueue.get(msg.guild.id).textChannel.id + ">.");
			
		}

		
		
	
		
		

	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["j", "join"]


};