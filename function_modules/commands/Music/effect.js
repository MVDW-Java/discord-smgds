const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const Discord = require('discord.js');
const Genius = require("genius-lyrics");
const Client = new Genius.Client();

module.exports = {

	run: async function(msg, args) {
		msg.channel.send(":test_tube: This is an experimental command, things might not work or break.");
		
		if(args.length == 1){
		
			var filter;
			switch(args[0]){
				case "3d":
					 filter = vars.distube.setFilter(msg, "3d");
				break;
				case "bassboost":
					filter = vars.distube.setFilter(msg, "bassboost");
				break;
				case "echo":
					filter = vars.distube.setFilter(msg, "echo");
				break;
				case "karaoke":
					filter = vars.distube.setFilter(msg, "karaoke");
				break;
				case "nightcore":
					filter = vars.distube.setFilter(msg, "nightcore");
				break;
				case "vaporwave":
					filter = vars.distube.setFilter(msg, "vaporwave");
				break;
				case "off":
					filter = vars.distube.setFilter(msg, "vaporwave");
				break;
				default:
					msg.channel.send("invailid command use, !filter <filter type>\n\nSupported filter types:\n - 3d\n - bassboost\n - echo\n - karaoke\n - nightcore\n - vaporwave\n\nKeep in mind this is still early testing.");
					return;
				break;

			}
			

			
			var filters_on = filter.join(", ") || 'Off';
			msg.channel.send("Current queue filter: " + filters_on);
			
		
		} else {
			msg.channel.send("invailid command use, !filter <filter type>\n\nSupported filter types:\n - 3d\n - bassboost\n - echo\n - karaoke\n - nightcore\n - vaporwave\n\nKeep in mind this is still early testing.");
		
		}
		
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["filter"]


};
