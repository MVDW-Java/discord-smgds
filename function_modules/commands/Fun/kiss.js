const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

	run: function run(msg, args) {
		

		if(args[0] == null){
			msg.channel.send("Who do you wanna kiss?");
		} else {
			
			//TODO: make regex instead of the replace thing I made...
			
			var kiss_str;
			
			
			if(args[1] == null){
				// I wanna kiss someone
				
				var kiss_who = args[0].replace("<@!", "").replace(">", "").replace("<@", "");
				var kiss_who_user = msg.guild.member(kiss_who);
				
				if(!kiss_who_user){
					msg.channel.send("Can't find user.");
					return;
				}
				
				kiss_str = "**<@!"+ msg.author.id + "> has kissed <@!" + kiss_who + ">**";
				
			} else {
				// Someone else need to kiss someone :flushed:
				
				var kiss_select_1 = args[0].replace("<@!", "").replace(">", "").replace("<@", "");
				var kiss_select_1_user = msg.guild.member(kiss_select_1);
				
				var kiss_select_2 = args[1].replace("<@!", "").replace(">", "").replace("<@", "");
				var kiss_select_2_user = msg.guild.member(kiss_select_2);
				
				if(!kiss_select_1_user || !kiss_select_2_user){
					msg.channel.send("Can't find user.");
					return;
				}
				
				kiss_str = "**<@!"+ kiss_select_1 + "> has kissed <@!" + kiss_select_2 + ">**";
			}
			

			axios.get('https://api.tenor.com/v1/random?key=TVJDWW2OUNVU&q=anime-kiss&limit=1').then(response => {
				
				const json = response.data;
					
				const embed = new Discord.MessageEmbed()
				.setTitle(":kiss: Kiss")
				.setColor("#ff3355")
				.setImage(json.results[0].media[0].gif.url)
				.setDescription(kiss_str)
				.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
				.setTimestamp()
					
				msg.channel.send(embed);
					
			});
		}
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "726509180638199888", "725751071254773800", "738654956780781568", "885543263111639061", "815586562083520556", "819950156928778260"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["kiss"]
};