const imports = require('../../imports');
const globalVars = require('../../globalvars');
const glofunc = require('../../globalfunctions');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

	run: function run(msg) {
		var match = msg.content.match(/https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?/g);
		if(match){
			match.forEach(v =>{
				console.log("URL FOUND: " + v);
				axios.get("https://www.enthix.net/video/API/v1/getYTtoCreo.php?v=" + v).then(response => {
				
					const json = response.data;
					if(json.status == "true"){
						msg.channel.send("Hey <@!" + msg.author.id + ">! Did you know this video from " + json.author + " is avalible on Creo?\nCreo is a platform to help your favorite creators out and does not track viewers unlike youtube.\nWatch it here: https://www.enthix.net/video/watch.php?v=" + json.id);
					}
				});
			
			});
		}
		
		
	},
	ModuleType: "messagelistener",
	MessageTriggerCommand: false,
	MessageTriggerDM: false,
	MessageTriggerBotUser: false


};



