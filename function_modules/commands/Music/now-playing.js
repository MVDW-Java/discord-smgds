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
		if(args.length == 1){
			if(args[0] == "v2"){
				
				String.prototype.splice = function(idx, rem, str) {
					return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
				};

				
				var percentage = Math.round((serverQueue.songs[0].timeleft/serverQueue.songs[0].length) * 16);
				
				var timebutton = "\\🔘";
				var timebar = "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬".splice(percentage, 0, timebutton);
				
				
				
				
				
				const now_playing = new Discord.MessageEmbed()
					.setColor('#7b36f5')
					.setTitle(':arrow_forward: Now Playing:')
					.setDescription("__**" + serverQueue.songs[0].title + "**__\n" +
					"*By " + serverQueue.songs[0].author + "*\n\n" + 
					timebar + "\n" + 
					glofunc.toHHMMSS(serverQueue.songs[0].timeleft) + " / " + glofunc.toHHMMSS(serverQueue.songs[0].length) + "\n\n")
					.setThumbnail(serverQueue.songs[0].thumbnail)
					.setFooter("Listen on Project Video", serverQueue.songs[0].url);
					
					
					
				msg.channel.send(now_playing);
				
				return;
				
			}
			
			
		}
			
		
		
		const now_playing = new Discord.MessageEmbed()
			.setColor('#7b36f5')
			.setTitle(':arrow_forward: Now Playing:')
			.addField('Name:', serverQueue.songs[0].title, false)
			.addField('Author:', serverQueue.songs[0].author, true)
			.addField('Lenght:', glofunc.toHHMMSS(serverQueue.songs[0].length), true)
			.addField('Time left:', glofunc.toHHMMSS(serverQueue.songs[0].timeleft), true)
			.setThumbnail(serverQueue.songs[0].thumbnail)
			
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