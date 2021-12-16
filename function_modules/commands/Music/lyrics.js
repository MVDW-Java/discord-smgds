const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const Discord = require('discord.js');
const Genius = require("genius-lyrics");
const Client = new Genius.Client();

module.exports = {

	run: async function(msg, args) {
		msg.channel.send(":test_tube: This is an experimental command, things might not work or break.");
		
		try {
			const searches = await Client.songs.search(args.join(" "));
			if(searches.length == 0){
				msg.channel.send(":mag_right: No results found.\nPlease check your spelling.");
				return;
			}
			
			
			//console.log(searches[0]);
			const firstSong = searches[0];

			const lyrics = await firstSong.lyrics();
			let verse = lyrics.split('\n\n');
			
			
			var lyrics_embeds = [];
			var lyrics_messages = [];
			var lyrics_position = 0;
			
			for(var i = 0; i<verse.length; i++){
				
				const lyrics_embed = new Discord.MessageEmbed()
				.setColor('#2ecc71')
				.setDescription(verse[i]);
				
				
				if(lyrics_embeds.length == 10){
					lyrics_position = 0;
					var message_array_pos = lyrics_messages.length + 1;
					lyrics_messages[message_array_pos] = lyrics_embeds;
					lyrics_embeds = [];
				}
				
				lyrics_embeds[lyrics_position] = lyrics_embed;
				
				
				lyrics_position++;
			}
			console.log("lyleng: " + lyrics_messages.length);
			
			for(var i = 0; i<lyrics_messages.length; i++){
				msg.channel.send({embeds: lyrics_messages[i]});
			}
			
		} catch(e) {
			msg.channel.send(":face_with_spiral_eyes: Oops.. Something went wrong, but at least we prevented a full crash.\n\n```" + e + "```");
		}
		
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["lyrics"]


};
