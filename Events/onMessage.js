const imports = require('../imports');
const Discord = require('discord.js');
const globalVars = require('../globalvars');
const fs = require("fs");

imports.bot.on('messageCreate', async msg => {
	
	
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

	var messages_queue = globalVars.message_queue.get(msg.channel.id);
	
	
	if(globalVars.message_queue.has(msg.channel.id)){
		var author_id = msg.author.id;
		var message = msg.content;

		//Add message to the queue and move up.
		var queue_generator = [
			{"author": msg.author.id, "msg": msg},
			{"author": messages_queue[0].author, "msg": messages_queue[0].msg},
			{"author": messages_queue[1].author, "msg": messages_queue[1].msg},
			{"author": messages_queue[2].author, "msg": messages_queue[2].msg},
			{"author": messages_queue[3].author, "msg": messages_queue[3].msg}
		];
		globalVars.message_queue.set(msg.channel.id, queue_generator);
		
	} else {

		var queue_generator = [
			{"author": msg.author.id, "msg": msg},
			{"author": "0", "msg": ""},
			{"author": "0", "msg": ""},
			{"author": "0", "msg": ""},
			{"author": "0", "msg": ""}
		];

		globalVars.message_queue.set(msg.channel.id, queue_generator);
		
	}
	function GetUserPermissions(msg){
	
	
		var usr = msg.guild.members.cache.get(msg.author.id);

		if(usr.roles.cache.has("815588044497223701") || usr.roles.cache.has("775382408505458769") || msg.author.id == "481895822624161795"){
			return 9;
		} else if(usr.roles.cache.has("777470894125219861") || msg.author.id == "481895822624161795"){
			return 1;
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
									msg.channel.send(":no_entry_sign: **Sorry,** *But you can't use that command in this channel.*\n(This message will be deleted in 10 seconds.)").then(m => setTimeout(async () => await m.delete(), 10000));
									return;
								}
							}
						}
						
						if(msg.guild){
						
							//Check guild
							if(!imports.ModuleImports.get(k).CommandRunGuild){
								msg.channel.send(":no_entry_sign: **Sorry,** *But you can't use this command in guilds, please use dms.*\n(This message will be deleted in 10 seconds.)").then(m => setTimeout(async () => await m.delete(), 10000));
								return;
							}
							
						} else {
							
							//Check dms
							if(!imports.ModuleImports.get(k).CommandRunDM){
								msg.channel.send(":no_entry_sign: **Sorry,** *But you can't use this command in dms, please use guilds.*\n(This message will be deleted in 10 seconds.)").then(m => setTimeout(async () => await m.delete(), 10000));
								return;
							}

						}
						if(msg.guild){
							if(imports.ModuleImports.get(k).Permissions <= GetUserPermissions(msg)){
								imports.ModuleImports.get(k).run(msg, args);
							} else {
								msg.channel.send(":no_entry_sign: **Sorry,** *But you don't have the permissions to run this command.*\n(This message will be deleted in 10 seconds.)").then(m => setTimeout(async () => await m.delete(), 10000));
							}
						} else {
							if(imports.ModuleImports.get(k).Permissions == 0){
								imports.ModuleImports.get(k).run(msg, args);
							} else {
								msg.channel.send(":no_entry_sign: **Sorry,** *But you don't have the permissions to run this command.*\n(This message will be deleted in 10 seconds.)").then(m => setTimeout(async () => await m.delete(), 10000));
							}
						}
					} catch (e) {
						console.log(e);
						var mvdw_fix_this_you_lazy_cuck = msg.guild.members.cache.get("481895822624161795");
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
