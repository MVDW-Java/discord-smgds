var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
var os 	= require('os-utils');

module.exports = {

	run: function run(msg, args) {

		const embed = new Discord.MessageEmbed()
			.setTitle(":bar_chart: MVDW's server status")
			.setDescription("**Note:** *Detected using Proxmox, things may not show up or accurate.*\n\nPlatform: ``" + os.platform() + "``\nCPU count: ``" + os.cpuCount() + "``\nFree mem: ``" + os.freemem() + "``\nTotal mem: ``" + os.totalmem() + "``\nFree mem%: ``" + os.freememPercentage() + "``\nSys uptime: ``" + os.sysUptime() + "``\nProc uptime: ``" + os.processUptime() + "``\nLoad 1, 5, 15 min: ``" + os.loadavg(1) + ", " + os.loadavg(5) + ", " + os.loadavg(15) +"``")
			.setColor("#2ecc71")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();
			
			msg.channel.send({embeds: [embed]});
	},
	ModuleType: "command",
	Permissions: 9,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["sys"]
};
