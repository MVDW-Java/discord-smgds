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
		
		
		const user = msg.guild.member(msg.author.id);
		const games2 = msg.author.presence.activities;
		console.log(user.user);

		const embed = new Discord.MessageEmbed()
			.setTitle("User information")
			.setThumbnail(user.user.displayAvatarURL({ dynamic: true, size: 1024, format: "png" }))
			.setColor("#2ecc71")
			.addField("Tag", user.user.tag, true)
			.addField("ID", user.id, true)
			.addField("Nickname:", `${user.nickname !== null ? `${user.nickname}` : `None`}`, true)
			.addField("Bot", user.bot ? "Yes" : "No", true) 
			.addField("Created At", `${msg.author.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.author.createdAt)})`, true)
			.addField("Joined At", `${new Date(user.joinedTimestamp).toUTCString().substr(0, 16)} (${checkDays(new Date(user.joinedTimestamp))})`, true) 
			.addField("Game Playing", games2.length !== 0 ? games2 : `None`, true)
			.addField("Status", statuss[user.presence.status], true)
			.addField("Roles List", user.roles.cache.map(roles => `${roles}`).join(' | '))
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp()

		msg.channel.send(embed);
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["userinfo", "useri", "userinformation"]
};