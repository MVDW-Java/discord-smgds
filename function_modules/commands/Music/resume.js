const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const ytdl = require("ytdl-core");

module.exports = {

	run: async function(msg, args) {
		
		const serverQueue = imports.MusicQueue.get(msg.guild.id);
		serverQueue.connection.connection.resume(); 
		
		
		//vars.dispatcher.resume();
		//glofunc.musicTimeLeft(imports.MusicQueue.get(msg.guild.id).songs[0]);
		msg.channel.send(":arrow_forward: Song ``" + imports.MusicQueue.get(msg.guild.id)["songs"][0]["title"] + "`` has been resumed.");

	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["resume"]


};