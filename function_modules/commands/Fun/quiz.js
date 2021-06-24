const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const globalVars = require('../../../globalvars');
const Discord = require('discord.js');
const axios = require('axios');
const quiz_file = require('../../../assets/quiz.json');

module.exports = {

	run: function run(msg, args) {
		
		if(args.length == 0){
			msg.channel.send("Please fill in your answer");
			return;
		}
		
		var user_answer = args.join("").toLowerCase();
		
		if(globalVars.minigame_active == -1){
			msg.channel.send("There is no quiz active.");
			//msg.channel.send("debug: '" + user_awnser + "'");
			return;
		}
		
		
		
		
		if(user_answer == quiz_file[globalVars.minigame_active].answer){
			msg.channel.send("<@!" + msg.author.id + "> has won!");
			globalVars.minigame_active = -1;
			
		} else {
			msg.channel.send("Wrong answer :(");
			
		}
		
		
		
		
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["quiz"]
};