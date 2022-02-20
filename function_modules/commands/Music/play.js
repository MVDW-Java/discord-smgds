const imports = require('../../../imports');
const globalVars = require('../../../globalvars');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const ytdl = require("discord-ytdl-core");
const ytsr = require("ytsr");
const axios = require('axios');
const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')

module.exports = {

	run: async function SimpleCommand(msg, args) {

		
		//console.log("DEBUG : " globalVars.distube.getQueue(message));
		//console.log(globalVars.distube.getQueue(voiceChannel).songs[0].formattedDuration);
		//msg.channel.send("Music is under maintenance.");
		//if(msg.author.id !== "481895822624161795") return;
		//msg.channel.send("ok, bypass");
		
	
		
		var song = [];
		const allowed_filetypes = ["flac", "wav", "mp3", "mp4", "webm", "avi", "ogg"];
		const voiceChannel = msg.member.voice.channel;
		var status = 200;
		
		if (!voiceChannel) {
			msg.channel.send("You need to be in a voice channel to play music!");
			return;
		}

		const permissions = voiceChannel.permissionsFor(msg.client.user);

		if(globalVars.music_djonly && msg.author.id !== "481895822624161795"){
			msg.channel.send(":lock: Sorry, DJ only is ``enabled``, you can't do any music related commands.");
			return;
		}


		if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
			msg.channel.send("I need the permissions to join and speak in your voice channel!");
			return;
		}
		
		
		
		/*
		type of media:
		0 -> YouTube
		1 -> Project Video
		2 -> Soundcloud
		3 -> file
		*/
		
		const loading_message = msg.channel.send("<a:bot_loading:942029047213482024> Downloading metadata...").then(async loading_message => {
		
			
			//Use Project Video
			if (msg.attachments.size > 0) {
				msg.attachments.forEach(attachment => {
					for (var i in allowed_filetypes){
					    var url = attachment.url;
					    
					    var url_split = url.split("/");
					    var filename_from_split = url_split.length - 1;
					    var filename = url_split[filename_from_split];
					    
					    
					    
					    if(url.includes(allowed_filetypes[i])){
						    song.push({
							    type: 3,
							    title: filename,
							    url: url,
							    length: 0,
							    timeleft: 0,
							    author: "Unknown",
							    thumbnail: "https://www.enthix.net/video/backend/thumbnail_proxy.php?id="
						    });
						    status = 200;
					    }
					    

					
					}

					if(status !== 200){
						loading_message.edit("Please upload a vailid file type.");
						return;
					}
					
					
					
				});

				
					

				
			
			} else if(args.length == 0){
				msg.channel.send("Usage: ``!p <song name/url>``");
				return;

			//Use text to play music.
			} else {
				var args_unsplit = args.join(" ");
				var url = "";
				
				if(args_unsplit.startsWith("http")){
					url = args_unsplit;
				} else {
					const search = await ytsr(args.join(" "), { pages: 1 });
					//console.log(search.items);
					status = 404;
					
					if (search.items.length > 0){
						await search.items.forEach(yt_item => {
							if(yt_item.type == "video" && status !== 200 ){
								status = 200;
								url = yt_item.url;
							}
						});
					}
				
				}
				
				
				if(status == 200){
					await axios.get("https://enthix.net/yt2source.php?key=UIAHDFJSDFHSJKDSHFKHKJFEWIUYEUIWYEWUYISJBBJBNMCXIYUOWEUUDSJHKKJSLALAOPPOFJBJHEHEHHHHEEXNBNBNBCNXBNBXXXX&yt=" + url).then(function (response) {
						status = response.data.status;
						
						if(response.data.status == "200"){
							var service_type = 0;
							switch(response.data.extractor){
								case "youtube": service_type = 0; break;
								case "creo": service_type = 1; break;
								case "soundcloud": service_type = 2; break;
							}
						
						
						
							song.push({
								type: service_type,
								title: response.data.title,
								url: response.data.url,
								length: parseInt(response.data.time),
								timeleft: 0,
								author: response.data.author,
								thumbnail: response.data.thumbnail
							});
						}
					
					}).catch(function (error) {
						serverQueue.textChannel.send("Error while decoding source ```" + error + "```");
						console.log(error);
						return;
					})
				}
				
			}

			if(status == 200){
				if (!globalVars.MusicQueue.get(msg.guild.id)) {
					const queueContruct = {
						textChannel: msg.channel,
						voiceChannel: voiceChannel,
						connection: null,
						songs: [],
						volume: 50,
						playing: true,
					};

					globalVars.MusicQueue.set(msg.guild.id, queueContruct);
					
					var song_each_count = 0;
					song.forEach(song_each => {
					    song_each_count++;
					    if(song_each_count > 1) loading_message.edit(":1234: The song ``" + song_each.title + "`` has been added to the queue.");
					    queueContruct.songs.push(song_each);
			  		});
			    
					try {
						const connection = joinVoiceChannel({
							channelId : msg.member.voice.channel.id,
							guildId : msg.guild.id,
							adapterCreator: msg.guild.voiceAdapterCreator
						});
						//var connection = await voiceChannel.join();
						queueContruct.connection = connection;
						glofunc.PlaySong(msg.guild, queueContruct.songs[0], 0, 0, loading_message);
					} catch (err) {
						console.log(err);
						globalVars.MusicQueue.delete(msg.guild.id);
						msg.channel.send(err);
					}
				} else {
				    song.forEach(song_each => {
					    const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
					    if(serverQueue.songs.length == 0){
						serverQueue.songs.push(song_each);
						glofunc.PlaySong(msg.guild, serverQueue.songs[0], 0, 0, loading_message);
					    } else {
						var estimated_time = 0;
					    	
					    	for (var i in serverQueue.songs){
					    		console.log(serverQueue.songs[i].length);
					    		estimated_time = estimated_time + serverQueue.songs[i].length;
					    		console.log(estimated_time);
					    	}
					    	console.log(serverQueue.songs[0].length - serverQueue.songs[0].timeleft);
					    	estimated_time = estimated_time - serverQueue.songs[0].timeleft;
						serverQueue.songs.push(song_each);
						
						loading_message.edit(":1234: The song ``" + song_each.title + "`` has been added to the queue.\nEstimated time till playing: ``" + glofunc.toHHMMSS(estimated_time) + "``");
					    }
					});
				}
			} else if(status == 404){
				loading_message.edit(":mag_right: **Video not found.**");
			
			} else if(status == 403){
				loading_message.edit(":underage: **Video age-restricted.**\nWe can't play this video because its age restricted.\nYou need to connect your YouTube account to play age-restricted content.\nhttps://enthix.net/connect2music");
			}

		});
		
		
		
		
		
		
		

	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["p", "play"]


};
