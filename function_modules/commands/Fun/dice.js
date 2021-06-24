var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		
		//TODO: Make animation so its more fun.
		
		
		const roll = Math.floor(Math.random() * 6);
		var result;
		var result_image;
		
		switch (roll) {
			
			case 0:
				result = "One";
				result_image = "https://cdn.discordapp.com/attachments/730762778469597194/730765322570694697/unknown.png";
				break;
			case 1:
				result = "Two";
				result_image = "https://cdn.discordapp.com/attachments/730762778469597194/730765402614923274/unknown.png";
				break;
			case 2:
				result = "Three";
				result_image = "https://cdn.discordapp.com/attachments/730762778469597194/730765456423780402/unknown.png";
				break;
			case 3:
				result = "Four";
				result_image = "https://cdn.discordapp.com/attachments/730762778469597194/730765532697198643/unknown.png";
				break;
			case 4:
				result = "Five";
				result_image = "https://cdn.discordapp.com/attachments/730762778469597194/730765572136239200/unknown.png";
				break;
			case 5:
				result = "Six";
				result_image = "https://cdn.discordapp.com/attachments/730762778469597194/730765649680400414/unknown.png";
				break;
		}
		
		const embed_animation = new Discord.MessageEmbed()
			.setColor("#ff3355")
			.setTitle(":game_die: Dice roller")
			.setImage("https://cdn.discordapp.com/attachments/730762778469597194/730765766101696572/unknown.png")
			.setDescription("Rolling... Please wait.")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();
			
		const embed_result = new Discord.MessageEmbed()
			.setColor("#ff3355")
			.setTitle(":game_die: Dice roller")
			.setImage(result_image)
			.setDescription("The dice has landed on **" + result + "**.")
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
	CommandName: ["dice", "roll", "diceroll", "roledice"]
};