const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const globalVars = require('../../../globalvars');
const Discord = require('discord.js');
const axios = require('axios');
const enemy_file = require('../../../assets/enemy.json');

module.exports = {

	run: function run(msg, args) {
		
		
		if(globalVars.minigame_active == -1 || globalVars.minigame_type !== 1){
			msg.channel.send("There is no enemy to spin on.");
			return;
		}
		

		if(globalVars.death_users.includes(msg.author.id)){
			msg.channel.send("You're already death.");
			return;
		}
		msg.channe.send("a spin attack is currently disabled, use !stomp for now.");
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["spin"]
};