const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const ytdl = require("ytdl-core");

module.exports = {

	run: async function(msg, args) {
		
		if(args.length == 0){ 
			msg.channel.send(":loud_sound: The volume is at ``" + (imports.MusicQueue.get(msg.guild.id)["volume"]) + "%``.");
		
		
		} else {
		
		
			imports.MusicQueue.get(msg.guild.id)["volume"] = args[0];
			console.log(imports.MusicQueue.get(msg.guild.id)["volume"]);
			vars.dispatcher.setVolumeLogarithmic(imports.MusicQueue.get(msg.guild.id)["volume"] / 100)
			
			msg.channel.send(":loud_sound: Volume has been set to ``" + args[0] + "%``.");
		}
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["volume"]


};