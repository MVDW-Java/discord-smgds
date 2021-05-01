const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");

module.exports = {

	run: async function SimpleCommand(msg, args) {
		const serverQueue = imports.MusicQueue.get(msg.guild.id);
		if (!serverQueue){
			msg.channel.send('There is no queue.');
			return;
		}
		
		var queue_description = "";
		var queue_counter = 1;
		
		serverQueue.songs.forEach(element => {
			queue_description = queue_description + "\n\n" + queue_counter + ". \`\`" + element.title + "\`\`";
			queue_counter++;
		});
		const queue = new Discord.MessageEmbed()
			.setColor('#7b36f5')
			.setTitle(':1234: Queue:')
			.setDescription(queue_description);

			
		msg.channel.send(queue);
		
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["queue", "q"]


};