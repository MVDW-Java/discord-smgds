const imports = require('./imports');
const globalVars = require('./globalvars');
const vars = require('./globalvars');
var user_timeout = new Map();
const ytdl = require('play-dl');
var mysql = require('mysql-await');
const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')
require('dotenv').config();

module.exports = {



	GetSingleMentionAfterCommandUsage: function GetSingleMentionAfterCommandUsage(msg) {

		var msgcontent = msg.content;

		if (msgcontent.startsWith(`<@!${imports.bot.user.id}>` + " ")) {
			var indexOfFirstSpace = msgcontent.indexOf(" ");
			if (indexOfFirstSpace != -1) {
				msgcontent = msgcontent.substr(indexOfFirstSpace + 1);
			}
		}

		var userMentionedForAvatar = null;

		var indexOfFirstSpace = msgcontent.indexOf(" ");
		if (indexOfFirstSpace != -1) {
			userMentionedForAvatar = msgcontent.substr(indexOfFirstSpace + 1);
			var indexOfSecondSpace = userMentionedForAvatar.indexOf(" ");
			if (indexOfSecondSpace != -1) {
				userMentionedForAvatar = userMentionedForAvatar.substr(0, indexOfSecondSpace);
			}
		}

		return userMentionedForAvatar;

	},



	CommandHandler: function CommandHandler(msg, commands) {

		var prefix = ">>"; // Should be later get from the database to change the prefix.

		const message = msg.content.toLowerCase();
		var messageString = message;
		var indexOfFirstSpace = messageString.indexOf(" ");

		if (commands !== undefined) {
			for (var i = 0; i < commands.length; i++) {

				var commandWithPrefixAlt = prefix + commands[i];
				var commandWithBotMentionAlt = `<@!${imports.bot.user.id}>` + " " + commands[i];

				if (messageString.startsWith(commandWithBotMentionAlt)) {
					if (indexOfFirstSpace != -1) {
						messageString = messageString.substr(indexOfFirstSpace + 1);
						var indexOfSecondSpace = messageString.indexOf(" ");
						if (indexOfSecondSpace != -1) {
							messageString = messageString.substr(0, indexOfSecondSpace);
						}
					}
				}
				else if (messageString.startsWith(commandWithPrefixAlt)) {
					if (indexOfFirstSpace != -1) {
						messageString = messageString.substr(0, indexOfFirstSpace);
						var indexOfSecondSpace = messageString.indexOf(" ");
						if (indexOfSecondSpace != -1) {
							messageString = messageString.substr(0, indexOfSecondSpace);
						}
					}
				}
				else {

				}

				if (messageString == commandWithPrefixAlt || messageString == commands[i]) {
					if (module.exports.CommandTimeout(msg)) return true;
				}
			}
		}

		return false;


	},




	CommandTimeout: function CommandTimeout(msg) {
		
		
		//TODO: Fix the memory leak I just created...
		//TODO: Check if user is premium, will be from the database.

		//var timeoutTime = 5000;	// This will be production timeouts for a user for fun commands. Some command will need to be not limited by timeout, such as moderation ones.
		var timeoutTime = 0;
		
		if(user_timeout.has(msg.author.id)){
			if(user_timeout.get(msg.author.id) > Date.now()){
				msg.channel.send("Please wait 5 seconds before running a command again\nTo bypass this you can buy premium.");
				return false;
				
			} else{
				user_timeout.set(msg.author.id, Date.now() + timeoutTime);
				return true;
			}
			
		} else {
			
			user_timeout.set(msg.author.id, Date.now() + timeoutTime);
			return true;
		}
		
	},


	// Checks if this is production or not, held in the .evn file that is being git ignored.
	CheckProductionMode: function CheckProductionMode() {

		const ISTHISPRODUCTION = process.env.ISTHISPRODUCTION;
		if (ISTHISPRODUCTION == "TRUE") {
			return true;
		}

		return false;
	},


	// You can make it force sleep (wait) if you need to. 
	// Only use this in async functions, otherwise you're gonna make whatever you are doing lag hard.
	// Sometimes the bot might respond too fast lol
	ForceSleep: function ForceSleep(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	},


	GetAllFilesFromPath: function GetAllFilesFromPath(dirPath, existingArrayOfFiles) {

		files = require("fs").readdirSync(dirPath);

		var arrayOfFiles = existingArrayOfFiles || [];		// if there is an existing array of files we can use that, or just create a new array

		files.forEach(function (file) {
			if (require("fs").statSync(dirPath + "/" + file).isDirectory()) {
				arrayOfFiles = GetAllFilesFromPath(dirPath + "/" + file, arrayOfFiles);
			} else {
				arrayOfFiles.push(require("path").join(dirPath, "/", file));
			}
		})

		return arrayOfFiles;
	},
	PlaySong: async function play(guild, song, loop = 0, start = 0) {
		
		const serverQueue = globalVars.MusicQueue.get(guild.id);
		

		if (!song || song === null) {
			//serverQueue.voiceChannel.leave();
			//imports.MusicQueue.delete(guild.id);
			serverQueue.textChannel.send("No songs in queue, Waiting for a song.");
			return;
		}
		
		if(song.type == 0){
			
			var stream = await ytdl.stream(song.url);
			
			vars.audioResource = createAudioResource(stream.stream, {
				inlineVolume: true
			});
			
		} else if(song.type == 1 || song.type == 2  || song.type == 3){
			
			vars.audioResource = createAudioResource(song.url, {
				inlineVolume: true
			});

		}
		
		
		vars.audioPlayer = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Play
			}
		});
		
		vars.audioResource.volume.setVolume(serverQueue["volume"] / 100);
		
		vars.audioPlayer.play(vars.audioResource, { seek: start });
		serverQueue.connection.subscribe(vars.audioPlayer);


		





		//  --------- Events
		vars.audioPlayer.on(AudioPlayerStatus.Playing, () => {
			module.exports.musicTimeLeft(song);
			if(loop == 0 &&  start == 0) serverQueue.textChannel.send(":arrow_forward: Start playing ``" + song.title + "``\nNote: Because we are buffering the stream now for performance it may stutter at the start.");
		});
		
		vars.audioPlayer.on(AudioPlayerStatus.Idle, () => {
			next_song();
		});


		vars.audioPlayer.on('error', error => {
			console.error(error);
		});
		
		// ----------------
		
		
		
		
		
		
		
		function next_song(){
			if(globalVars.MusicLoop){
				module.exports.PlaySong(guild, serverQueue.songs[0], 1);
			} else {
				serverQueue.songs.shift();
				vars.vote_skip_song = [];
				module.exports.PlaySong(guild, serverQueue.songs[0], 0);
				//vars.audioPlayer.destroy();
			}
			
		}
		
		/*
		console.log(song.url);
		
		if(song.type == 0) vars.dispatcher = serverQueue.connection.play(await ytdl.stream(song.url).stream, { seek: start });
		if(song.type == 1 || song.type == 2  || song.type == 3) vars.dispatcher = serverQueue.connection.play(song.url, { seek: start });

	
		module.exports.musicTimeLeft(song);
		
		
		
		//vars.dispatcher = serverQueue.connection.play(play_api, { seek: start }); //, quality: 'highestaudio', highWaterMark: 1 << 25
		
		
		//serverQueue.connection.subscribe(serverQueue.player);
		
		vars.dispatcher.on("finish", () => {
			serverQueue.textChannel.send("SONG FINISHED.");
			next_song();
		});
		
		
		vars.dispatcher.on("end", () => {
			serverQueue.textChannel.send("SONG HARD END.");
			next_song();
		});
		
		vars.dispatcher.on("error", error => serverQueue.textChannel.send("An error accured, please inform MVDW: \n```" + error + "```"));
		
		//console.log(serverQueue.volume);
		vars.dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
		
		if(loop == 0 &&  start == 0) serverQueue.textChannel.send(":arrow_forward: Start playing ``" + song.title + "``\nNote: Because we are buffering the stream now for performance it may stutter at the start.");
		
		*/
		
		
	}, 
	toHHMMSS: function (sec) {
		var sec_num = parseInt(sec, 10);
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours+':'+minutes+':'+seconds;
	},
	toHex: function(data) {
		if(!data) return;
		var arr1 = [];
		for (var n = 0, l = data.length; n < l; n ++) {
			var hex = Number(data.charCodeAt(n)).toString(16);
			arr1.push(hex);
		}
		return arr1.join('');
	},
	con:  mysql.createConnection({
		host: process.env.MYSQLHOST,
		user: process.env.MYSQLUSER,
		password: process.env.MYSQLPASS,
		database: process.env.MYSQLDB,
		socketPath: "/var/run/mysqld/mysqld.sock"
	}),
	musicTimeLeft: function(song){
		setInterval(() => {
			song.timeleft++;
			if (song.timeleft == song.length) clearInterval(module.exports.musicTimeLeft);
		}, 1000);

	}

};



