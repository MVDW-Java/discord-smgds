const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

	run: function run(msg, args) {
		
		if(args[0] == null){
			msg.channel.send("Who do you wanna hug?");
		} else {
			
			//TODO: make regex instead of the replace thing I made...
			
			var hug_str;
			
			
			if(args[1] == null){
				// I wanna kiss someone
				
				var hug_who = args[0].replace("<@!", "").replace(">", "").replace("<@", "");
				var hug_who_user = msg.guild.member(hug_who);
				
				if(!hug_who_user){
					msg.channel.send("Can't find user.");
					return;
				}
				
				hug_str = "**<@!"+ msg.author.id + "> has hugged <@!" + hug_who + ">**";
				
			} else {
				// Someone else need to kiss someone :flushed:
				
				var hug_select_1 = args[0].replace("<@!", "").replace(">", "").replace("<@", "");
				var hug_select_1_user = msg.guild.member(hug_select_1);
				
				var hug_select_2 = args[1].replace("<@!", "").replace(">", "").replace("<@", "");
				var hug_select_2_user = msg.guild.member(hug_select_2);
				
				if(!hug_select_1_user || !hug_select_2_user){
					msg.channel.send("Can't find user.");
					return;
				}
				
				hug_str = "**<@!"+ hug_select_1 + "> has hugged <@!" + hug_select_2 + ">**";
			}
			

			axios.get('https://api.tenor.com/v1/random?key=TVJDWW2OUNVU&q=anime-hug&limit=1').then(response => {
				
				const json = response.data;
					
				const embed = new Discord.MessageEmbed()
				.setTitle(":hugging: hug")
				.setColor("#ff3355")
				.setImage(json.results[0].media[0].gif.url)
				.setDescription(hug_str)
				.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
				.setTimestamp()
					
				msg.channel.send(embed);
					
			});
		}
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "726509180638199888", "725751071254773800"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["hug"]
};