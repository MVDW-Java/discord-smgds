var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

	run: function run(msg, args) {
		try {
			axios.get('https://www.reddit.com/r/foodporn/random.json?limit=1').then(response => {
				const json = response.data;
			
				const embed = new Discord.MessageEmbed()
					.setTitle(`:pizza: Foodporn`)
					.setColor("#ff3355")
					.setDescription("Here is a picture of good looking food.")
					.setImage(json[0].data.children[0].data.url_overridden_by_dest)
					.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
					.setTimestamp()
				msg.channel.send(embed);
				
			});
		} catch (e) {
			
			var mvdw_fix_this_you_lazy_cuck = msg.guild.member("704751650912469022");
			mvdw_fix_this_you_lazy_cuck.send("Ok this time you did a fuckup!!! Foodcommand broke as fuck lol..\n\n```" + e + "```\n**THIS IS THE FOOD COMMAND!!!!**\nREAD THIS YOU LAZY CUCK!!!!!!!!!!!!");
			
			msg.channel.send("Furrys at Discord HQ for sure don't know how to program.\nMVDW has been informed and try to make a patch.");
		}
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "726509180638199888", "725751071254773800", "753968014508163184", "885543263111639061", "815586562083520556", "819950156928778260"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["foodporn", "food", "foodp", "foodpic", "foodpics", "foodimg", "foodimages"]
};