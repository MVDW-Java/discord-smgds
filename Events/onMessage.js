const imports = require('../imports');
const Discord = require('discord.js');
const fs = require("fs");

const glotransactions = require('../globaltransactionpool');		// Global Transaction pool for databasing

imports.bot.on('message', async msg => {
	
	
	if(msg.author.bot) return;
	
	var message = msg.content.toLowerCase();
	var args = Array.from(msg.content.split(" "));


	var run_command = false;
	//var serverPrefix = await glotransactions.GetServerPrefix(msg.guild.id);
	//if (serverPrefix == false) {
		//msg.channel.send("The server prefix for this server has not been found.... something has gone terribly wrong, please join the support server.");
    //}

	//var prefix = serverPrefix; 
	var prefix = ">>"; // Should be later get from the database to change the prefix.
	var CommandName;


	//Splitting/Detecting the command and args.
	if (message.startsWith(">>")) {
		if (args[0] !== null) {
			CommandName = args[0].replace(">>", "");
			args = args.slice(1);
			run_command = true;
		}

	} else if (message.startsWith("!")) {
		if (args[0] !== null) {
			CommandName = args[0].replace("!", "");
			args = args.slice(1);
			run_command = true;
		}

	} else if (message.startsWith("<@!" + imports.bot.user.id + "> ")) {
		if (args[1] !== null) {
			CommandName = args[1];
			args = args.slice(2);
			run_command = true;
		}
	}

	function GetUserPermissions(msg){
	
	
		var usr = msg.guild.member(msg.author.id);

		//To lazy to fix.

		if(usr.roles.cache.has("724315965306830861") || msg.author.id == "743220676877615164" || msg.author.id == "541673884219604993" || msg.author.id == "764876247251419138" || msg.author.id == "481895822624161795"){
			return 9;
		} else if(usr.roles.cache.has("724315734347612210")){
			return 7;
		} else if(usr.roles.cache.has("726884850161942530")){
			return 6;
		}
	
		return 0;
	}


	if(run_command){
		for (let [k, v] of imports.ModuleImports.entries()) {
			if(imports.ModuleType.get(k) == "command"){
				if(imports.ModuleImports.get(k).CommandName.includes(CommandName.toLowerCase())){
					try {
						
						
						//Check channel whitelist
						if(imports.ModuleImports.get(k).CommandToggleWhitelist){
							if(!imports.ModuleImports.get(k).CommandWhitelist.includes(msg.channel.id)){
								if(msg.guild){
									msg.channel.send("This channel has not been whitelisted.");
									return;
								}
							}
						}
						
						if(msg.guild){
						
							//Check guild
							if(!imports.ModuleImports.get(k).CommandRunGuild){
								msg.channel.send("You can not use this command in guilds, please use dms.");
								return;
							}
							
						} else {
							
							//Check dms
							if(!imports.ModuleImports.get(k).CommandRunDM){
								msg.channel.send("You can not use this command in dms, please use guilds.");
								return;
							}

						}
						if(msg.guild){
							if(imports.ModuleImports.get(k).Permissions <= GetUserPermissions(msg)){
								imports.ModuleImports.get(k).run(msg, args);
							} else {
								msg.channel.send("No permissions.");
							}
						} else {
							if(imports.ModuleImports.get(k).Permissions == 0){
								imports.ModuleImports.get(k).run(msg, args);
							} else {
								msg.channel.send("No permissions.");
							}
						}
					} catch (e) {
						console.log(e);
						var mvdw_fix_this_you_lazy_cuck = msg.guild.member("743220676877615164");
						mvdw_fix_this_you_lazy_cuck.send("Yo!! You maybe fucked up somewhere..\n\n```" + e + "```\nOk thanks.");
						msg.channel.send("I'm terribly sorry but an error occurred during processing of the command. The developers have been informed.");
					}
				}
			}
		}
	}

	/* ----------
	Message Listener
	---------- */
	
	for (let [k, v] of imports.ModuleImports.entries()) {
		if(imports.ModuleType.get(k) == "messagelistener"){
			//MessageTriggerCommand = true // run even if command
			//MessageTriggerCommand = false // don't run if command.
			
			if(!imports.ModuleImports.get(k).MessageTriggerDM && !msg.guild) return;
			
			if(run_command && imports.ModuleImports.get(k).MessageTriggerCommand || !run_command && !imports.ModuleImports.get(k).MessageTriggerCommand || !run_command && imports.ModuleImports.get(k).MessageTriggerCommand ){
				imports.ModuleImports.get(k).run(msg);
			}
		}
	}

});