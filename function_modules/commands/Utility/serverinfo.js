var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
		
		function checkDays(date) {
			let now = new Date();
			let diff = now.getTime() - date.getTime();
			let days = Math.floor(diff / 86400000);
			return days + (days == 1 ? " day" : " days") + " ago";
		};
  
		let region = {
			"brazil": ":flag_br: Brazil",
			"eu-central": ":flag_eu: Central Europe",
			"singapore": ":flag_sg: Singapore",
			"us-central": ":flag_us: U.S. Central",
			"sydney": ":flag_au: Sydney",
			"us-east": ":flag_us: U.S. East",
			"us-south": ":flag_us: U.S. South",
			"us-west": ":flag_us: U.S. West",
			"eu-west": ":flag_eu: Western Europe",
			"vip-us-east": ":flag_us: VIP U.S. East",
			"london": ":flag_gb: London",
			"amsterdam": ":flag_nl: Amsterdam",
			"hongkong": ":flag_hk: Hong Kong",
			"russia": ":flag_ru: Russia",
			"southafrica": ":flag_za:  South Africa",
			
			"europe": ":flag_eu: Europe",
			"india": ":flag_in: Inda",
			"japan":":flag_jp: Japan"
		};
		let verification = {
			"NONE": ":white_circle: None",
			"LOW": ":green_circle: Low",
			"MEDIUM": ":yellow_circle: Medium",
			"HIGH": ":orange_circle: High",
			"VERY_HIGH": ":red_circle: Highest"
		};
		
		const embed = new Discord.MessageEmbed()
			.setTitle(`Server information`)
			.setThumbnail(msg.guild.iconURL())
			.setColor("#2ecc71")
			.addField("Name", msg.guild.name, true)
			.addField("ID", msg.guild.id, true)
			.addField("Owner", `<@!${msg.guild.ownerID}>`, true)
			.addField("Region", region[msg.guild.region], true)
			.addField("Member Count", `${msg.guild.memberCount}`, true)
			.addField("Verification Level", verification[msg.guild.verificationLevel], true)
			.addField("Channels", msg.guild.channels.cache.size, true)
			.addField("Roles", msg.guild.roles.cache.size, true)
			.addField("Creation Date", `${msg.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, true)
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp()
		msg.channel.send(embed);
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["serverinfo", "serveri", "serverinformation"]
};