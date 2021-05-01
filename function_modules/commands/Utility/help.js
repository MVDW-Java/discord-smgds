var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		
		var prefix = ">>";
		
		const embed = new Discord.MessageEmbed()
			.setTitle(":question: Help")
			.setDescription("Here are all commands avalible.\nPrefix of this server is ``" + prefix + "``.\n\n<argument> = required.\n [argument] = Optional\n\n----------")
			.addField(":pizza: " + prefix + "Foodporn", "Sending pictures of good looking food", true)
			.addField(":nauseated_face: " + prefix + "Foodgore", "Sending pictures of bad looking food", true)
			.addField(":question: " + prefix + "Help", "Sending this message.", true)
			.addField(":bust_in_silhouette: " + prefix + "Avatar", "Gives you the image of your or someone else his profile picture.", true)
			.addField(":kiss: " + prefix + "Kiss", "Will make 2 users kiss each other.", true)
			.addField(":white_circle: " + prefix + "Roleinfo", "Will give you a list with active users.", true)
			.addField(":orange_circle: " + prefix + "Coinflip", "Will flip a coin.", true)
			.addField(":game_die: " + prefix + "Dice", "Will roll a dice", true)
			.addField(":alarm_clock: " + prefix + "Ping", "Shows the delay between the Discord API and the BMC servers.", true)
			.addField(":globe_with_meridians: " + prefix + "Serverinfo", "Shows information about the Discord server", true)
			.addField(":bust_in_silhouette: " + prefix + "Useinfo", "Will give you information about your account.", true)
			.addField(":star2: " + prefix + "Credits", "Everyone who has helped made this bot possible.", true)
			.addField(":fist: " + prefix + "Punch", "Will punch someone.", true)
			.addField(":wrench: " + prefix + "Settings", "Change the server settings.", true)
			.addField(":information_source: " + prefix + "Botinfo", "Get some information about the bot.", true)
			.addField(":newspaper: " + prefix + "Chanelog", "View the latest updates on the bot!", true)
			.addField(":spoon: " + prefix + "spoonful", "Only a spoonful", true)
			.addField(":hugging: " + prefix + "hug", "Will hug someone", true)
			.setColor("#ff3355")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();
			
			msg.channel.send(embed);
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["help"]
};