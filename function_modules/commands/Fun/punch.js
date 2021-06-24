const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

	run: function run(msg, args) {
		
		if(args[0] == null){
			msg.channel.send("Who do you wanna punch?");
		} else {
			
			//TODO: make regex instead of the replace thing I made...
			
			var punch_str;
			
			
			if(args[1] == null){
				// I wanna punch someone
				
				var punch_who = args[0].replace("<@!", "").replace(">", "").replace("<@", "");
				var punch_who_user = msg.guild.member(punch_who);
				
				if(!punch_who_user){
					msg.channel.send("Can't find user.");
					return;
				}
				
				punch_str = "**<@!"+ msg.author.id + "> has punched <@!" + punch_who + ">**";
				
			} else {
				// Someone else need to punch someone :fist:
				
				var punch_select_1 = args[0].replace("<@!", "").replace(">", "").replace("<@", "");
				var punch_select_1_user = msg.guild.member(punch_select_1);
				
				var punch_select_2 = args[1].replace("<@!", "").replace(">", "").replace("<@", "");
				var punch_select_2_user = msg.guild.member(punch_select_2);
				
				if(!punch_select_1_user || !punch_select_2_user){
					msg.channel.send("Can't find user.");
					return;
				}
				
				punch_str = "**<@!"+ punch_select_1 + "> has punched <@!" + punch_select_2 + ">**";
			}
			

			axios.get('https://api.tenor.com/v1/random?key=TVJDWW2OUNVU&q=anime-punch&limit=1').then(response => {
				
				const json = response.data;
					
				const embed = new Discord.MessageEmbed()
				.setTitle(":fist: Punch")
				.setColor("#ff3355")
				.setImage(json.results[0].media[0].gif.url)
				.setDescription(punch_str)
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
	CommandName: ["punch"]
};