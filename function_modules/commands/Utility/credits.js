var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		
		//TODO: Get the latest tags from ID's instead of hardcoding it in.
		
		const embed = new Discord.MessageEmbed()
			.setTitle(":star2: Credits")
			.setDescription("Thank to the following people who helped with making this bot possible:")
			.addField("All Developers:",":black_circle: @Yoshiko#7777\n:black_circle: @MVDW#0001\n:black_circle: @No.#9999\n:black_circle: @Ciel#3670", true)
			.addField("Designers:",":black_circle: @MVDW#0001", true)
			.addField("Framework:",":black_circle: @Yoshiko#7777\n:black_circle: @MVDW#0001", true)
			.addField("Kiss,Punsh,Boob,Hug command:",":black_circle: @Yoshiko#7777\n:black_circle: @MVDW#0001", true)
			.addField("foodporn/foodgore command:",":black_circle: @MVDW#0001", true)
			.addField("Leveling system:",":black_circle: @MVDW#0001\n:black_circle: @Ciel#3670", true)
			.addField("Event handlers:",":black_circle: @Yoshiko#7777\n:black_circle: @MVDW#0001\n:black_circle: @No.#9999\n:black_circle: @Ciel#3670", true)
			.addField("Confess system:",":black_circle: @MVDW#0001", true)
			.addField("Avatar command:",":black_circle: @Yoshiko#7777", true)
			.addField("Avatar/Ping command:",":black_circle: @Yoshiko#7777", true)
			.addField("Coinflip/Dice/Spoonful command:",":black_circle: @MVDW#0001", true)
			.addField("Help/Credits command:",":black_circle: @MVDW#0001", true)
			.setColor("#ff3355")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();
			
			msg.channel.send(embed);
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["credits", "devs", "developers", "designers"]
};