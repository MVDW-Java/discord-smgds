var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

	run: function run(msg, args) {
		
		axios.get('https://www.reddit.com/r/foodgore/random.json?limit=1').then(response => {
			
			const json = response.data;
			
			const embed = new Discord.MessageEmbed()
			.setTitle(`:nauseated_face: Foodgore`)
			.setColor("#ff3355")
			.setDescription("Here is a picture of bad looking food.")
			.setImage(json[0].data.children[0].data.url_overridden_by_dest)
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp()
			msg.channel.send(embed);
		});
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "726509180638199888", "725751071254773800"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["foodgore", "foodg", "badfood"]
};