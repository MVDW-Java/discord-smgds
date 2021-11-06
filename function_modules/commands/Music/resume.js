const globalVars = require('../../../globalvars');

module.exports = {

	run: async function(msg, args) {

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