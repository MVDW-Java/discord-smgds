var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg) {
		

		function checkDays(date) {
			let now = new Date();
			let diff = now.getTime() - date.getTime();
			let days = Math.floor(diff / 86400000);
			return days + (days == 1 ? " day" : " days") + " ago";
		};
  
		
		let statuss = {
			"online": `:green_circle: Online`,
			"idle": `:yellow_circle: Idle`,
			"dnd": `:red_circle: Do Not Disturb`,
			"offline": `:white_circle: Offline`
		};
		
		//TODO: Make users let other people see there information.
		
		
		const user = msg.mentions.users.first() || msg.author;
		const games2 = user.presence.activities;
		
		
		const embed = new Discord.MessageEmbed()
			.setTitle("User information")
			.setThumbnail(user.displayAvatarURL())
			.setColor("#ff3355")
			.addField("Tag", user.tag, true)
			.addField("ID", user.id, true)
			.addField("Nickname:", `${user.nickname !== null ? `${user.nickname}` : `None`}`, true)
			.addField("Bot", user.bot ? "Yes" : "No", true) 
			.addField("Created At", `${user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.createdAt)})`, true)
			//.addField("Joined At", `${user.joinedTimestamp().toUTCString().substr(0, 16)} (${checkDays(user.joinedAt)})`, true)
			//.addField("Game Playing", games2 !== null ? games2 : `None`, true)
			.addField("Status", statuss[user.presence.status], true)
			//.addField("Roles List", user.roles.cache.map(roles => `${roles}`).join(' | '))
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp()
			
		msg.channel.send(embed);
	},
	ModuleType: "command",
	Permissions: 9,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["724287850966941846", "726509180638199888", "725751071254773800"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["userinfo", "useri", "userinformation"]
};