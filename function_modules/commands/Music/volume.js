const globalVars = require('../../../globalvars');

module.exports = {

	run: async function(msg, args) {

		if(args.length == 0){ 
			msg.channel.send(":loud_sound: The volume is at ``" + (globalVars.MusicQueue.get(msg.guild.id)["volume"]) + "%``.");
		
		
		} else {
		
		
			globalVars.MusicQueue.get(msg.guild.id)["volume"] = args[0];
			
			globalVars.audioResource.volume.setVolume(args[0] / 100);
			
			
			
			msg.channel.send(":loud_sound: Volume has been set to ``" + args[0] + "%``.");
		}
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["volume"]


};