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
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["yoshiko"]
};