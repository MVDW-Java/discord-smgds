const globalVars = require('../../../globalvars');

module.exports = {

	run: async function SimpleCommand(msg, args) {
	
		if(globalVars.music_djonly){
			msg.channel.send(":lock: DJ only has been :x: ``disabled``.");
			globalVars.music_djonly = false;
		} else {
			msg.channel.send(":lock: DJ only has been :white_check_mark: ``enabled``.");
			globalVars.music_djonly = true;
		}
	
	},
	ModuleType: "command",
	Permissions: 9,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["djonly"]


};
