const globalVars = require('../../../globalvars');

module.exports = {

	run: async function(msg, args) {

		if(globalVars.music_djonly && msg.author.id !== "481895822624161795"){
			msg.channel.send(":lock: Sorry, DJ only is ``enabled``, you can't do any music related commands.");
			return;
		}

		const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		msg.channel.send(":arrow_forward: Song ``" + serverQueue["songs"][0]["title"] + "`` has been resumed.");
		globalVars.audioPlayer.unpause();
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["resume"]


};
