const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");

module.exports = {

	run: async function SimpleCommand(msg, args) {
		const serverQueue = imports.MusicQueue.get(msg.guild.id);
		if (!serverQueue){
			msg.channel.send('There is nothing playing right now.');
			return;
		}

				
		String.prototype.splice = function(idx, rem, str) {
			return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
		};

		
		var percentage = Math.round((serverQueue.songs[0].timeleft/serverQueue.songs[0].length) * 15);
		
		var timebutton = "\\🔘";
		var timebar = "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬".splice(percentage, 0, timebutton);
		
		var listening_platform_name = "REPORT TO MVDW";
		var listening_platform_icon = "";
		switch(serverQueue.songs[0].type){
			case 0:
				listening_platform_name = "YouTube";
				listening_platform_icon = "https://cdn.discordapp.com/attachments/834518897549508649/834713284627529748/youtube_play1600.png";
				break;
			case 1:
				listening_platform_name = "Project Video";
				listening_platform_icon = "https://cdn.discordapp.com/attachments/834518897549508649/834716460307709972/project_video_logo_2.png";
				break;
			case 2:
				listening_platform_name = "SoundCloud";
				listening_platform_icon = "";
				break;
			case 3:
				listening_platform_name = "uploaded file";
				listening_platform_icon = "";
				break;
		}
		
		
		
		const now_playing = new Discord.MessageEmbed()
			.setColor('#7b36f5')
			.setTitle(':arrow_forward: Now Playing:')
			.setDescription("__**" + serverQueue.songs[0].title + "**__\n" +
			"*By " + serverQueue.songs[0].author + "*\n\n" + 
			timebar + "\n" + 
			glofunc.toHHMMSS(serverQueue.songs[0].timeleft) + " / " + glofunc.toHHMMSS(serverQueue.songs[0].length) + "\n\n")
			.setThumbnail(serverQueue.songs[0].thumbnail)
			.setFooter("Listen on " + listening_platform_name, listening_platform_icon);
			
			
			
		msg.channel.send(now_playing);
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["nowplaying", "now-playing", "np"]


};