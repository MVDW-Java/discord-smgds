const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const ytdl = require("discord-ytdl-core");
const ytsr = require("ytsr");
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

	run: async function(msg, args) {
		msg.channel.send(":warning: Due the recode this function is not ready yet.");
		return;
		if(args.length == 0){ 
			
			const playlist_help = new Discord.MessageEmbed()
				.setColor('#7b36f5')
				.setTitle(':1234: Playlist > Help')
				.setDescription("Here is some help on how to use playlists:\n\n\n" +
				"``!playlist create (playlist name)`` : ``Create a playlist``\n\n" +
				"``!playlist add (playlist name) (song)`` : ``Add a song to the playlist``\n\n" +
				"``!playlist songs (playlist name)`` : ``List all songs in from a playlist inside the server.``\n\n" +
				"``!playlist personal (playlist name)`` : ``List all songs in from a playlist from your self.``\n\n" +
				"``!playlist play (playlist name)`` : ``Play the playlist or add the playlist to the queue``\n\n" +
				"``!playlist delete (playlist name)`` : ``Delete a playlist``")
			
		msg.channel.send(playlist_help);
		
		} else {
			switch(args[0].toLowerCase()){
				case "create":
			
				
					if(args.length == 2){
						
						
						glofunc.con.query("SELECT * FROM music_playlist WHERE belongs='" + msg.guild.id + "' AND name='" + args[1] + "'", function (err, result) {
							if(err){
								msg.channel.send(":no_entry_sign: Something went terrably wrong.");
								return;
							}
							
							var row_count = 0;
							Object.keys(result).forEach(function(key) {
								row_count++;
							});
							
							if(row_count == 0){
								glofunc.con.query("INSERT INTO music_playlist (belongs, name) VALUES ('" + msg.guild.id + "', '" + args[1] + "')", function (err, result) {
									if(err){
										msg.channel.send(":no_entry_sign: Something went terrably wrong :joy:\nThis is what happens when you are lazy.");
										return;
									}
									msg.channel.send(":1234: Playlist ``" + args[1] + "`` has been created.");
									
								});
							} else {
								msg.channel.send(":no_entry_sign: The playlist called ``" + args[1] + "`` already exists.");
							}
						});
					} else {
						msg.channel.send(":1234: Please spesify the name of the playlist.");
					}
				break;
				case "add":
					if(args.length == 1){
						msg.channel.send(":1234: Please spesify the name of the playlist.");
					} else if(args.length == 2){
						msg.channel.send(":1234: Please spesify the name of the song.");
					} else {
						glofunc.con.query("SELECT * FROM music_playlist WHERE belongs='" + msg.guild.id + "' AND name='" + args[1] + "'", function (err, result) {
							if(err){
								msg.channel.send(":no_entry_sign: Something went terrably wrong.");
								return;
							}
							
							var row_count = 0;
							var playlist_id;
							
							
							Object.keys(result).forEach(function(key) {
								playlist_id = result[key].id;
								row_count++;
							});
							
							if(row_count == 1){
								glofunc.con.query("INSERT INTO music_playlist_songs (playlist, song) VALUES ('" + playlist_id + "', '" + args[2] + "')", function (err, result) {
									if(err){
										msg.channel.send(":no_entry_sign: Something went terrably wrong.");
										return;
									}
									msg.channel.send(":1234: Song has been added to the playlist.");
								});
							} else {
								msg.channel.send(":no_entry_sign: The playlist called ``" + args[1] + "`` does not exist. Create one!");
							}
						});
					
					
					
					}
					
				break;
				case "songs":
					msg.channel.send("TODO: MAKE SONGs");
				break;
				case "personal":
					msg.channel.send("TODO: MAKE PERSONAL");
				break;
				case "play":
					if(args.length == 2){

						glofunc.con.query("SELECT * FROM music_playlist WHERE belongs='" + msg.guild.id + "' AND name='" + args[1] + "'", function (err, result) {
							if(err){
								msg.channel.send(":no_entry_sign: Something went terrably wrong.");
								return;
							}
							
							var row_count = 0;
							var playlist_id;
							
							
							Object.keys(result).forEach(function(key) {
								playlist_id = result[key].id;
								row_count++;
							});
							
							if(row_count == 1){

								glofunc.con.query("SELECT * FROM music_playlist_songs WHERE playlist='" + playlist_id + "'", async function (err, result) {
									if(err){
										msg.channel.send(":no_entry_sign: Something went terrably wrong :joy:\nThis is what happens when you are lazy.");
										return;
									}
									
									const voiceChannel = msg.member.voice.channel;

									if (!voiceChannel) {
										msg.channel.send("You need to be in a voice channel to play music!");
										return;
									}

									const permissions = voiceChannel.permissionsFor(msg.client.user);

									if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
										msg.channel.send("I need the permissions to join and speak in your voice channel!");
										return;
									}
									
									msg.channel.send(":1234: Loading playlist in queue...");
									
									Object.keys(result).forEach(async function(key) {
										

											
										if(result[key].song.includes("enthix")){
											
											var video_id = result[key].song.split('v=')[1];
											var ampersandPosition = video_id.indexOf('&');
											
											if(ampersandPosition != -1) {
												video_id = video_id.substring(0, ampersandPosition);
											}
											
											
											await axios.get("https://www.enthix.net/video/API/v1/getVideoInfo.php?v=" + video_id).then(function (response) {
											
												song = {
													type: 1,
													title: response.data.title,
													url: "https://www.enthix.net/video/backend/buffer_video.php?v=" + video_id,
													length: parseInt(response.data.length),
													timeleft: 0,
													author: response.data.author,
													thumbnail: "https://www.enthix.net/video/backend/thumbnail_proxy.php?id=" + video_id
												};
												
												
												
											}).catch(function (error) {
												console.log(error);
												return;
											})
										//Use SoundCloud
										} else if(result[key].song.includes("soundcloud")){
											
											await axios.get("http://api.soundcloud.com/resolve.json?url=" + result[key].song + "&client_id=71dfa98f05fa01cb3ded3265b9672aaf").then(function (response) {
												
												song = {
													type: 2,
													title: response.data.title,
													url: "http://api.soundcloud.com/tracks/" + response.data.id + "/stream?consumer_key=71dfa98f05fa01cb3ded3265b9672aaf",
													length: response.data.duration / 1000,
													timeleft: 0,
													author: response.data.user.username
												};
												
											}).catch(function (error) {
												console.log(error);
												return;
											})




										//Use Youtube
										} else if(ytdl.validateURL(result[key].song)){
											
											var args_unsplit = "";
											var url;
											
											for (var i in args) {
												args_unsplit = args_unsplit + args[i] + " ";
											}
											
											//make search function
											if(args_unsplit.startsWith("http")){
												
												url = args_unsplit;
												
											} else {
												
												url = ytdl.searchYouTubeAsync(args_unsplit);
											}
											
											
											const songInfo = await ytdl.getInfo(url);
											console.log(songInfo.videoDetails.thumbnails);

											song = {
												type: 0,
												title: songInfo.videoDetails.title,
												url: songInfo.videoDetails.video_url,
												length: songInfo.videoDetails.lengthSeconds,
												timeleft: 0,
												author: songInfo.videoDetails.author.name,
												thumbnail: songInfo.videoDetails.thumbnails[0].url
											};
											
										} else {
											
											const search = await ytsr(args.join(" "), { pages: 1 });
											console.log(search.items);
											
											
											if (search.items.length == 0) return message.channel.send("No songs were found!");
											
											var found = false;
											
											await search.items.forEach(yt_item => {
												if(yt_item.type == "video" && !found){
													console.log(yt_item.title);
													found = true;
													
													song = {
														type: 0,
														title: yt_item.title,
														url: yt_item.url,
														length: 0,
														timeleft: 0,
														author: yt_item.author.name,
														thumbnail: yt_item.bestThumbnail
													};
												}
											});
											

										}
										
									
										
										
										if (!imports.MusicQueue.get(msg.guild.id)) {
											const queueContruct = {
												textChannel: msg.channel,
												voiceChannel: voiceChannel,
												connection: null,
												songs: [],
												volume: 50,
												playing: true,
											};

											imports.MusicQueue.set(msg.guild.id, queueContruct);
											queueContruct.songs.push(song);

											try {
												var connection = await voiceChannel.join();
												queueContruct.connection = connection;
												glofunc.PlaySong(msg.guild, queueContruct.songs[0], 0);
											} catch (err) {
												console.log(err);
												imports.MusicQueue.delete(msg.guild.id);
												msg.channel.send(err);
											}
										} else {
											const serverQueue = imports.MusicQueue.get(msg.guild.id);
											serverQueue.songs.push(song);
										}
									});
								});
							} else {
								msg.channel.send(":no_entry_sign: The playlist ``" + args[1] + "`` does not exists.");
							}
						});
					} else {
						msg.channel.send(":1234: Please spesify the name of the playlist.");
					}
				break;
				case "delete":
					msg.channel.send("TODO: MAKE DELETE");
				break;
				default:
					msg.channel.send(":1234: Unknown argument, please type ``!playlist`` for help.");
				
			}

		}
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["playlist"]


};