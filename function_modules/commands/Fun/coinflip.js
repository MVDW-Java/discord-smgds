var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		
		//TODO: Make animation so its more fun.
		
		var result;
		var result_image;
		
		if(Math.floor(Math.random() * 2) == 0){
			result = "Heads";
			result_image = "https://cdn.discordapp.com/attachments/834518897549508649/855222068088930304/fm1.png";
		} else {
			result = "Tails";
			result_image = "https://cdn.discordapp.com/attachments/834518897549508649/855222070001795103/fm7.png";
		}
		
		
		const embed_animation = new Discord.MessageEmbed()
			.setColor("#ff3355")
			.setTitle(":orange_circle: CoinFlip")
			.setImage("https://cdn.discordapp.com/attachments/834518897549508649/855222068799209502/flap.gif")
			.setDescription("Flipping... Please wait.")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();
			
		const embed_result = new Discord.MessageEmbed()
			.setColor("#ff3355")
			.setTitle(":orange_circle: CoinFlip")
			.setImage(result_image)
			.setDescription("The coin has landed on **" + result + "**.")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();
					
		
		
		
		msg.channel.send(embed_animation).then(m => 
			setTimeout(function() {
				m.edit(embed_result)
			}, 5000));

	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "726509180638199888", "725751071254773800"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["coinflip", "flipcoin", "coinf"]
};