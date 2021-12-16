const imports = require('../../imports');
var glofunc = require('../../globalfunctions');

const Discord = require('discord.js');
const axios = require("axios");

module.exports = {

	run: function(interaction) {
		if (interaction.customId === 'command_avatar_global') {
			var requestedUser;
			var requestUserURL;
			var embed;
			var globalOnly;

			requestedUser = interaction.guild.members.cache.find(u => u.user.tag === interaction.message.embeds[0].description);
			//requestedUser = imports.bot.users.fetch(requestedUser.user.id);
			console.log(requestedUser);
			//console.log(requestedUser.User);
			
			//return;
			//requestedUser = imports.bot.members.cache.get(interaction.guild.members.cache.find(u => u.user.tag === interaction.message.embeds[0].description).user.id);
			globalOnly = true;
			
			if(!requestedUser || requestedUser == undefined || requestedUser == null){
				interaction.update({ content: "Sorry, but we can't get the user data.\nThe user might have changed his name or left this server.", embeds: [], components: [] });
				return;
			}
			
			axios.get("https://discord.com/api/guilds/" + interaction.guild.id + "/members/" + requestedUser.user.id, {
				headers: {
					Authorization: "Bot " + imports.bot.token
				}
			}).then(response => {
				if(response.data.avatar !== undefined && response.data.avatar !== null) globalOnly = false;
					
				
				requestUserURL = requestedUser.user.displayAvatarURL({ dynamic: true, size: 4096 });
				embed = new Discord.MessageEmbed();
				embed.title = ":bust_in_silhouette: Global avatar";
				
				embed.setImage(requestUserURL);
				
				embed.description = requestedUser.user.username + "#" + requestedUser.user.discriminator;
				
				const row = new Discord.MessageActionRow();
				row.addComponents(
					new Discord.MessageButton()
						.setCustomId("command_avatar_global")
						.setLabel('Global')
						.setStyle('PRIMARY')
						.setEmoji('🌐')
				);
				
				if(globalOnly){
					row.addComponents(
						new Discord.MessageButton()
							.setCustomId("server")
							.setLabel('Per server(Not active)')
							.setStyle('PRIMARY')
							.setEmoji('👥')
							.setDisabled(true)
					);
				
				} else {
					row.addComponents(
						new Discord.MessageButton()
							.setCustomId("command_avatar_server")
							.setLabel('Per server')
							.setStyle('PRIMARY')
							.setEmoji('👥')
					);
				
				}
			




				interaction.update({embeds: [embed], components: [row]});
			});
		} else if (interaction.customId === 'command_avatar_server') {
			var requestedUser;
			var requestUserURL;
			var embed;
			var globalOnly;

			requestedUser = interaction.guild.members.cache.find(u => u.user.tag === interaction.message.embeds[0].description);
			//requestedUser = imports.bot.users.fetch(requestedUser.user.id);
			console.log(requestedUser);
			//console.log(requestedUser.User);
			
			//return;
			//requestedUser = imports.bot.members.cache.get(interaction.guild.members.cache.find(u => u.user.tag === interaction.message.embeds[0].description).user.id);
			globalOnly = true;
			
			if(!requestedUser || requestedUser == undefined || requestedUser == null){
				interaction.update({ content: "Sorry, but we can't get the user data.\nThe user might have changed his name or left this server.", embeds: [], components: [] });
				return;
			}
			
			axios.get("https://discord.com/api/guilds/" + interaction.guild.id + "/members/" + requestedUser.user.id, {
				headers: {
					Authorization: "Bot " + imports.bot.token
				}
			}).then(response => {
				if(response.data.avatar !== undefined && response.data.avatar !== null) globalOnly = false;
					
				
				requestUserURL = requestedUser.displayAvatarURL({ dynamic: true, size: 4096 });
				embed = new Discord.MessageEmbed();
				embed.title = ":bust_in_silhouette: Per server avatar";
				
				embed.setImage(requestUserURL);
				
				embed.description = requestedUser.user.username + "#" + requestedUser.user.discriminator;
				
				const row = new Discord.MessageActionRow();
				row.addComponents(
					new Discord.MessageButton()
						.setCustomId("command_avatar_global")
						.setLabel('Global')
						.setStyle('PRIMARY')
						.setEmoji('🌐')
				);
				
				if(globalOnly){
					row.addComponents(
						new Discord.MessageButton()
							.setCustomId("server")
							.setLabel('Per server(Not active)')
							.setStyle('PRIMARY')
							.setEmoji('👥')
							.setDisabled(true)
					);
				
				} else {
					row.addComponents(
						new Discord.MessageButton()
							.setCustomId("command_avatar_server")
							.setLabel('Per server')
							.setStyle('PRIMARY')
							.setEmoji('👥')
					);
				
				}
			




				interaction.update({embeds: [embed], components: [row]});
			});
		}
		
	},
	ModuleType: "clickbutton"
	
}
