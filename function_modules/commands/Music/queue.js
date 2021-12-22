const globalVars = require('../../../globalvars');
const glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: async function SimpleCommand(msg, args) {
		const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		if (!serverQueue || serverQueue.songs.length == 0){
			msg.channel.send('There is no queue.');
			return;
		}
			
		var queue_description = "";
		var enable_next_page = false;
		var enable_pre_page = false;
		var page = 0;
		var page_size = 2;
		var page_start = 0;
		var page_end = page_size;
		
		
		if(args.length == 1){
			page = args[0].replace(/\D/g,'');
			page_start = page*page_size;
			page_end = page_start + page_size;
			
		}
		
		for (var i in serverQueue.songs){
			if(i >= page_start && i < page_end){
				var i1 = i;
				i1++;
				queue_description = queue_description + "\n\n" + i1 + ". ";
				if(i == 0){
					queue_description = queue_description + ":arrow_forward:";
				}
				
				queue_description = queue_description + " \`\`" + serverQueue.songs[i].title + "\`\` (" + glofunc.toHHMMSS(serverQueue.songs[i].length) + ")";
			}
			if(i < page_start && i < page_end){
				enable_pre_page = true;
			}
			if(i >= page_end) {
				enable_next_page = true;
			}
		}
		
		
		const row = new Discord.MessageActionRow();
		
		
		
		if(enable_pre_page){
			row.addComponents(
				new Discord.MessageButton()
					.setCustomId("command_queue_pre")
					.setLabel('Previous')
					.setStyle('PRIMARY')
					.setEmoji('⏮️')
			);
		} else {
			row.addComponents(
				new Discord.MessageButton()
					.setCustomId("command_queue_pre")
					.setLabel('Previous')
					.setStyle('PRIMARY')
					.setEmoji('⏮️')
					.setDisabled(true)
			);
		}
		
		
		if(enable_next_page){
			row.addComponents(
				new Discord.MessageButton()
					.setCustomId("command_queue_nex")
					.setLabel('Next')
					.setStyle('PRIMARY')
					.setEmoji('⏭️')
			);
		} else {
			row.addComponents(
				new Discord.MessageButton()
					.setCustomId("command_queue_nex")
					.setLabel('Next')
					.setStyle('PRIMARY')
					.setEmoji('⏭️')
					.setDisabled(true)
			);
		}
		
		
		const queue = new Discord.MessageEmbed()
			.setColor('#2ecc71')
			.setTitle(":1234: Queue > page " + page)
			.setDescription(queue_description);

			
		msg.channel.send({ embeds: [queue], components: [row] });
		
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["queue", "q"]


};
