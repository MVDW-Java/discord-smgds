const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const ytdl = require("ytdl-core");

module.exports = {

	run: async function(msg, args) {
	
		vars.dispatcher.pause();
		clearInterval(module.exports.musicTimeLeft);
		msg.channel.send(":pause_button: Song ``" + imports.MusicQueue.get(msg.guild.id)["songs"][0]["title"] + "`` has been paused.");

	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["pause"]


};