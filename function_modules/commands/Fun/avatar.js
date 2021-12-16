
const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');



const Discord = require('discord.js');
const axios = require("axios");

module.exports = {

	// Avatar Command - Yoshiko2000 (Recode by MVDW)
	run: function(msg, args) {
		
		var requestedUser;
		var requestedUserID;
		var requestUserURL;
		var embed;
		var globalOnly;

		//Get requested user
		if(args[0] == null){
			requestedUser = msg.guild.members.cache.find(u => u.user.tag === msg.author.tag);
			requestedUserID = msg.author.id;
		} else {
			requestedUserID = args[0].replace(/\D/g,'');
			
			if(requestedUserID !== "NaN"){
				requestedUser = msg.guild.members.cache.get(requestedUserID);
			}
		}
		if(!requestedUser || requestedUser == undefined || requestedUser == null){
			msg.channel.send("Can't find user.");
			return;
		}
		

		
		axios.get("https://discord.com/api/guilds/" + msg.guild.id + "/members/" + requestedUserID, {
			headers: {
				Authorization: "Bot " + imports.bot.token
			}
		}).then(response => {
			if(response.data.avatar !== undefined && response.data.avatar !== null){
				//requestUserURL = "https://cdn.discordapp.com/guilds/" +  msg.guild.id + "/users/" + requestedUserID + "/avatars/" + response.data.avatar + ".webp?size=4096";
				requestUserURL = requestedUser.displayAvatarURL({ dynamic: true, size: 4096 });
				globalOnly = false;
			} else {
				requestUserURL = requestedUser.user.displayAvatarURL({ dynamic: true, size: 4096 });
				globalOnly = true;
			}
			embed = new Discord.MessageEmbed();
			
			embed.description = requestedUser.user.username + "#" + requestedUser.user.discriminator;
		
			embed.setImage(requestUserURL);
			
			const row = new Discord.MessageActionRow();
			row.addComponents(
				new Discord.MessageButton()
					.setCustomId("command_avatar_global")
					.setLabel('Global')
					.setStyle('PRIMARY')
					.setEmoji('🌐')
			);
			
			if(globalOnly){
				embed.title = ":bust_in_silhouette: Global avatar";
				row.addComponents(
					new Discord.MessageButton()
						.setCustomId("command_avatar_server")
						.setLabel('Per server(Not active)')
						.setStyle('PRIMARY')
						.setEmoji('👥')
						.setDisabled(true)
				);
			
			} else {
				embed.title = ":bust_in_silhouette: Per server avatar";
				row.addComponents(
					new Discord.MessageButton()
						.setCustomId("command_avatar_server")
						.setLabel('Per server')
						.setStyle('PRIMARY')
						.setEmoji('👥')
				);
			
			}
			
			msg.channel.send({embeds: [embed], components: [row]});
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/*
		var userMention = glofunc.GetSingleMentionAfterCommandUsage(msg);

		var embeddedmsg = new Discord.MessageEmbed()
			.setColor("#ff3355")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();

		if (userMention == null) {
			embeddedmsg.title = ":bust_in_silhouette: " + msg.author.username + "'s Avatar";
			embeddedmsg.setImage(msg.author.displayAvatarURL({ dynamic: true, size: 4096 }));
			msg.channel.send(embeddedmsg);
		} else {

			var userAcctID = userMention.substr(0, userMention.length - 1);
			
			
			if (userAcctID.includes("!")){
				userAcctID = userAcctID.substr(3);
			} else {
				userAcctID = userAcctID.substr(2);
			}

			msg.guild.members.fetch(userAcctID);	// move the data of the member to cache if it's not.
			var userObject = msg.guild.members.cache.get(userAcctID);	//get the data from the cache, that you just stored with .fetch




			if (userObject) {
			
			
				embeddedmsg.title = ":bust_in_silhouette: Avatar";
				embeddedmsg.description = userObject.displayName;
				embeddedmsg.setImage(userObject.user.displayAvatarURL({ dynamic: true, size: 1024 }));
				msg.channel.send(embeddedmsg);
				
				
			} else {
				msg.channel.send("There has been an issue in retrieving that Avatar of the requested user. Please check the name or ID and try again. You can always mention the user to get their avatar. For example >>Avatar <UserMention>");
         		}

			// you can do any data you want with userObject.

			//msg.guild.members.fetch(userAcctID).then(memberInGuild => {
			//	const getTheMemberAsUser = memberInGuild.user;
			//	// you can also do it like this but you will have to work in the fetch itself.
			//}); 

			
			
		}*/

		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["avatar"]


};



