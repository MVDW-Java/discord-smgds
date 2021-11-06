const globalVars = require('../../../globalvars');
const Discord = require('discord.js');

module.exports = {

	run: async function SimpleCommand(msg, args) {
		const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		if (!serverQueue || serverQueue.songs.length == 0){
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
			.setColor('#2ecc71')
			.setTitle(':1234: Queue:')
			.setDescription(queue_description);

			
		msg.channel.send({ embeds: [queue] });
		
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["queue", "q"]


};