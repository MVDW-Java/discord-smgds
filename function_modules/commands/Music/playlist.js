const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const ytdl = require("ytdl-core");
const Discord = require('discord.js');

module.exports = {

	run: async function(msg, args) {
		
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
										
									
										var args_unsplit = result[key].song;
										var url;
										
										
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
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["playlist"]


};