const globalVars = require('../../../globalvars');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const fs = require("fs");
const axios = require("axios");
var ffmpeg = require('fluent-ffmpeg');
const Canvas = require("canvas");



module.exports = {

	run: async function run(msg, args){
		const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		

		if (!serverQueue || serverQueue.songs.length == 0){
			msg.channel.send('There is nothing playing right now.');
			return;
		}


		function wrapText(context, text, x, y, maxWidth, lineHeight) {
			var words = text.split(' ');
			var line = '';

			for(var n = 0; n < words.length; n++) {
				
				var testLine = line + words[n] + ' ';
				var metrics = context.measureText(testLine);
				var testWidth = metrics.width;
				
				if (testWidth > maxWidth && n > 0) {
					context.fillText(line, x, y);
					line = words[n] + ' ';
					y += lineHeight;
				} else {
					line = testLine;
				}
			}
			context.fillText(line, x, y);
		}




		if(args[0] == "v3"){
			//Create the image canvas object
			const canvas = Canvas.createCanvas(750, 394);
			const ctx = canvas.getContext('2d');
			
			Canvas.registerFont('./assets/fonts/manrope.ttf', { family: "visitor" }); //registr font
			Canvas.registerFont('./assets/fonts/SuperMario256.ttf', { family: "visitor" });
			Canvas.registerFont('./assets/fonts/marioscripttext.ttf', { family: "visitor" });
			
		
			var rng = Math.floor((Math.random() * 100000000000) + 999999999999);

			//var thumbnail = axios.get(serverQueue.songs[0].thumbnail);
			const image1 = await Canvas.loadImage('./assets/images/test.png');

			ctx.drawImage(image1, 424, 63, 247, 138); // no workies...
		
			var percentage = (serverQueue.songs[0].timeleft/serverQueue.songs[0].length) * 628;
		
			ctx.fillStyle = "#278561";
			ctx.fillRect(82, 238, 628, 26);
			ctx.fillStyle = "#4cdda4";
			ctx.fillRect(82, 239, percentage - 26, 26);
			
			const image2 = await Canvas.loadImage('./assets/images/now-playing-timebullet.png');
					ctx.drawImage(image2, percentage + 81 - 26, 238, 13, 26);
				
			const image3 = await Canvas.loadImage('./assets/images/now-playing.png');
			ctx.drawImage(image3, 0, 0, canvas.width, canvas.height);
			
			
			//Add text
			ctx.font = 'bold 26px Super Mario 256';
			ctx.fillStyle = "#ffffff";
			
			wrapText(ctx, serverQueue.songs[0].title, 78, 82, 358, 32);
			ctx.font = 'italic 20px Super Mario 256';
			ctx.fillText("By: ", 78, 192);
			ctx.font = 'bold 20px Super Mario 256';
			ctx.fillText(serverQueue.songs[0].author, 112, 192);
			
			ctx.font = 'normal 28px mario script text';
			ctx.fillText(glofunc.toHHMMSS(serverQueue.songs[0].timeleft) + " / " + glofunc.toHHMMSS(serverQueue.songs[0].length), 92, 304);
			
			
			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'now-playing.png');
			msg.channel.send({ files: [attachment] });

		
			
			
			
			
			return; //We don't need v2.
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
			.setColor('#2ecc71')
			.setTitle(':arrow_forward: Now Playing:')
			.setDescription("__**" + serverQueue.songs[0].title + "**__\n" +
			"*By " + serverQueue.songs[0].author + "*\n\n" + 
			timebar + "\n" + 
			glofunc.toHHMMSS(serverQueue.songs[0].timeleft) + " / " + glofunc.toHHMMSS(serverQueue.songs[0].length) + "\n\n")
			.setThumbnail(serverQueue.songs[0].thumbnail) //youtube bugged
			.setFooter("Listen on " + listening_platform_name, listening_platform_icon);

			
		msg.channel.send({ embeds: [now_playing] });
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["nowplaying", "now-playing", "np"]


};