const imports = require('../../imports');
var glofunc = require('../../globalfunctions');
const globalVars = require('../../globalvars');

const Discord = require('discord.js');
const axios = require("axios");

module.exports = {

	run: function(interaction) {
		function spliceSlice(str, index, count, add) {
		  // We cannot pass negative indexes directly to the 2nd slicing operation.
		  if (index < 0) {
		    index = str.length + index;
		    if (index < 0) {
		      index = 0;
		    }
		  }

		  return str.slice(0, index) + (add || "") + str.slice(index + count);
		}
	
	
	
		if (interaction.customId === 'music_pause') {
			
			
			const serverQueue = globalVars.MusicQueue.get(interaction.guild.id);
			if (!serverQueue || serverQueue.songs.length == 0){
				interaction.reply({ content: "There is nothing playing now.", ephemeral: true });
				return;
			}
			
			if(globalVars.music_djonly && interaction.user.id !== "481895822624161795"){
				interaction.reply({ content: ":lock: Sorry, DJ only is `enabled`, you can't do any music related commands.", ephemeral: true });
				return;
			}

			interaction.reply({ content: ":pause_button: Song ``" + serverQueue["songs"][0]["title"] + "`` has been paused.", ephemeral: false });
			globalVars.audioPlayer.pause();
			
			
			
			var percentage = Math.round((serverQueue.songs[0].timeleft/serverQueue.songs[0].length) * 15);
			
			var timebutton = "\\🔘";
			var timebar = spliceSlice("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", percentage, 0, timebutton);
			
			var listening_platform_name = "REPORT TO MVDW";
			var listening_platform_icon = "";
			switch(serverQueue.songs[0].type){
				case 0:
					listening_platform_name = "YouTube";
					listening_platform_icon = "https://cdn.discordapp.com/attachments/834518897549508649/834713284627529748/youtube_play1600.png";
					break;
				case 1:
					listening_platform_name = "Creo";
					listening_platform_icon = "https://www.watchcreo.com/assets/images/favicon_new.png";
					break;
				case 2:
					listening_platform_name = "SoundCloud";
					listening_platform_icon = "https://cdn.discordapp.com/attachments/885543263111639061/942008394896781392/iu.png";
					break;
				case 3:
					listening_platform_name = "uploaded file";
					listening_platform_icon = "https://cdn.discordapp.com/attachments/885543263111639061/942014209816936448/folder.png";
					break;
			}
			
			
			
			const now_playing = new Discord.MessageEmbed()
				.setColor('#19d3c8')
				.setTitle(':arrow_forward: Now Playing:')
				.setDescription("__**" + serverQueue.songs[0].title + "**__\n" +
				"*By " + serverQueue.songs[0].author + "*\n\n" + 
				timebar + "\n" + 
				glofunc.toHHMMSS(serverQueue.songs[0].timeleft) + " / " + glofunc.toHHMMSS(serverQueue.songs[0].length) + "\n\n")
				.setThumbnail(serverQueue.songs[0].thumbnail) //youtube bugged
				.setFooter("Listen on " + listening_platform_name, listening_platform_icon);
				
				
			const button_row = new Discord.MessageActionRow();
			const button_row2 = new Discord.MessageActionRow();
			button_row.addComponents(
				new Discord.MessageButton()
					.setCustomId("music_play")
					.setLabel('')
					.setStyle('PRIMARY')
					.setEmoji('▶️')
			);
			button_row.addComponents(
				new Discord.MessageButton()
					.setCustomId("music_skip")
					.setLabel('Skip')
					.setStyle('PRIMARY')
					.setEmoji('⏩')
			);
			button_row.addComponents(
				new Discord.MessageButton()
					.setCustomId("music_loop")
					.setLabel('Loop')
					.setStyle('PRIMARY')
					.setEmoji('🔂')
			);
			button_row2.addComponents(
				new Discord.MessageButton()
					.setLabel('Open Connect2Music')
					.setStyle('LINK')
					.setURL("https://www.enthix.net/connect2music")
					.setEmoji('🎵')
					.setDisabled(true)
			);
		
			
			
			
			interaction.message.edit({ embeds: [now_playing], components: [button_row, button_row2] })
			
			
		} else if (interaction.customId === 'music_play') {
			
			
			const serverQueue = globalVars.MusicQueue.get(interaction.guild.id);
			
			if (!serverQueue || serverQueue.songs.length == 0){
				interaction.reply({ content: "There is nothing playing now.", ephemeral: true });
				return;
			}
			
			if(globalVars.music_djonly && interaction.user.id !== "481895822624161795"){
				interaction.reply({ content: ":lock: Sorry, DJ only is `enabled`, you can't do any music related commands.", ephemeral: true });
				return;
			}

			interaction.reply({ content: ":arrow_forward: Song ``" + serverQueue["songs"][0]["title"] + "`` has been resumed.", ephemeral: false });
			globalVars.audioPlayer.unpause();
			
			
			
			var percentage = Math.round((serverQueue.songs[0].timeleft/serverQueue.songs[0].length) * 15);
			
			var timebutton = "\\🔘";
			var timebar = spliceSlice("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", percentage, 0, timebutton);
			
			var listening_platform_name = "REPORT TO MVDW";
			var listening_platform_icon = "";
			switch(serverQueue.songs[0].type){
				case 0:
					listening_platform_name = "YouTube";
					listening_platform_icon = "https://cdn.discordapp.com/attachments/834518897549508649/834713284627529748/youtube_play1600.png";
					break;
				case 1:
					listening_platform_name = "Creo";
					listening_platform_icon = "https://www.watchcreo.com/assets/images/favicon_new.png";
					break;
				case 2:
					listening_platform_name = "SoundCloud";
					listening_platform_icon = "https://cdn.discordapp.com/attachments/885543263111639061/942008394896781392/iu.png";
					break;
				case 3:
					listening_platform_name = "uploaded file";
					listening_platform_icon = "https://cdn.discordapp.com/attachments/885543263111639061/942014209816936448/folder.png";
					break;
			}
			
			
			
			const now_playing = new Discord.MessageEmbed()
				.setColor('#19d3c8')
				.setTitle(':arrow_forward: Now Playing:')
				.setDescription("__**" + serverQueue.songs[0].title + "**__\n" +
				"*By " + serverQueue.songs[0].author + "*\n\n" + 
				timebar + "\n" + 
				glofunc.toHHMMSS(serverQueue.songs[0].timeleft) + " / " + glofunc.toHHMMSS(serverQueue.songs[0].length) + "\n\n")
				.setThumbnail(serverQueue.songs[0].thumbnail) //youtube bugged
				.setFooter("Listen on " + listening_platform_name, listening_platform_icon);
				
				
			const button_row = new Discord.MessageActionRow();
			const button_row2 = new Discord.MessageActionRow();
			button_row.addComponents(
				new Discord.MessageButton()
					.setCustomId("music_pause")
					.setLabel('')
					.setStyle('PRIMARY')
					.setEmoji('⏸️')
			);
			button_row.addComponents(
				new Discord.MessageButton()
					.setCustomId("music_skip")
					.setLabel('Skip')
					.setStyle('PRIMARY')
					.setEmoji('⏩')
			);
			button_row.addComponents(
				new Discord.MessageButton()
					.setCustomId("music_loop")
					.setLabel('Loop')
					.setStyle('PRIMARY')
					.setEmoji('🔂')
			);
			button_row2.addComponents(
				new Discord.MessageButton()
					.setLabel('Open Connect2Music')
					.setStyle('LINK')
					.setURL("https://www.enthix.net/connect2music")
					.setEmoji('🎵')
					.setDisabled(true)
			);
		
			
			
			
			interaction.message.edit({ embeds: [now_playing], components: [button_row, button_row2] })
			
			
		} else if (interaction.customId === 'music_skip') {
			const serverQueue = globalVars.MusicQueue.get(interaction.guild.id);
				
			if (!serverQueue || serverQueue.songs.length == 0){
				interaction.reply({ content: "There is nothing playing now.", ephemeral: true });
				return;
			}
			
			if(globalVars.music_djonly && interaction.user.id !== "481895822624161795"){
				interaction.reply({ content: ":lock: Sorry, DJ only is `enabled`, you can't do any music related commands.", ephemeral: true });
				return;
			}
		
		
			var member_size_required = Math.round((serverQueue.voiceChannel.members.size - 1) / 2);
		
		
		
			if(globalVars.vote_skip_song.includes(interaction.user.id)){
				interaction.reply({ content: ":no_entry_sign: You already voted. `" + globalVars.vote_skip_song.length + "/" + member_size_required  + "`", ephemeral: true });
				return;
			}
			globalVars.vote_skip_song.push(interaction.user.id);
			
			
			
			
			
			if(globalVars.vote_skip_song.length < member_size_required){
				interaction.reply({ content: ":fast_forward: " + globalVars.vote_skip_song.length + "/" + member_size_required + " votes to skip."});
			} else {
				if(globalVars.MusicLoop){
					globalVars.MusicLoop = false;
					interaction.message.channel.send({ content: ":repeat_one: Loop removed."});
				}
				
				interaction.reply({ content: ":track_next: Skipping song..."});
				globalVars.audioPlayer.stop();
			}
		
		
		
		
		} else if (interaction.customId === 'music_loop') {
			const serverQueue = globalVars.MusicQueue.get(interaction.guild.id);
				
			if (!serverQueue || serverQueue.songs.length == 0){
				interaction.reply({ content: "There is nothing playing now.", ephemeral: true });
				return;
			}
			
			if(globalVars.music_djonly && interaction.user.id !== "481895822624161795"){
				interaction.reply({ content: ":lock: Sorry, DJ only is `enabled`, you can't do any music related commands.", ephemeral: true });
				return;
			}
			
			
			
			if(globalVars.MusicLoop){
				globalVars.MusicLoop = false;
				interaction.reply({ content: "Loop removed." });
			} else {
				globalVars.MusicLoop = true;
				interaction.reply({ content: ":repeat_one: Song `" + serverQueue.songs[0].title + "` looped." });
			}
		
		}
		
	},
	ModuleType: "clickbutton"
	
}
