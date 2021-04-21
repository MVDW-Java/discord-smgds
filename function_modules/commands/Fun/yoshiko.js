const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

	run: function run(msg, args) {
		axios.get('https://api.tenor.com/v1/random?key=TVJDWW2OUNVU&q=yohane&limit=1').then(response => {
				
			const json = response.data;
					
			const embed = new Discord.MessageEmbed()
				.setTitle("<:yohanerip:725042842971537439> Yoshiko")
				.setColor("#ff3355")
				.setImage(json.results[0].media[0].gif.url)
				.setDescription("YOHANE!")
				.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
				.setTimestamp()
					
			msg.channel.send(embed);
					
		});
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["724287850966941846", "726509180638199888", "725751071254773800", "738654956780781568"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["yoshiko"]
};