
const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');



const Discord = require('discord.js');
const axios = require("axios");

module.exports = {

	// Avatar Command - Yoshiko2000 (Recode by MVDW)
	run: async function(msg, args) {
		
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
		

		const bannerUrl = await getUserBannerUrl(requestedUserID, { size: 4096 });
		embed = new Discord.MessageEmbed();
		
		embed.description = requestedUser.user.username + "#" + requestedUser.user.discriminator;
		embed.title = ":bust_in_silhouette: Global banner";
		embed.setImage(bannerUrl);
		
		
		msg.channel.send({embeds: [embed]});
		
		
		
		
		
	async function getUserBannerUrl(userId, { dynamicFormat = true, defaultFormat = "webp", size = 512 } = {}) {

	    // Supported image sizes, inspired by 'https://discord.js.org/#/docs/main/stable/typedef/ImageURLOptions'.
	    if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
		throw new Error(`The size '${size}' is not supported!`);
	    }

	    // We don't support gif as a default format,
	    // because requesting .gif format when the original image is not a gif,
	    // would result in an error 415 Unsupported Media Type.
	    // If you want gif support, enable dynamicFormat, .gif will be used when is it available.
	    if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
		throw new Error(`The format '${defaultFormat}' is not supported as a default format!`);
	    }

	    // We use raw API request to get the User object from Discord API,
	    // since the discord.js v12's one doens't support .banner property.
	    const user = await imports.bot.api.users(userId).get();
	    if (!user.banner) return null;

	    const query = `?size=${size}`;
	    const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;

	    // If dynamic format is enabled we perform a HTTP HEAD request,
	    // so we can use the content-type header to determine,
	    // if the image is a gif or not.
	    if (dynamicFormat) {
		const { headers } = await axios.head(baseUrl);
		if (headers && headers.hasOwnProperty("content-type")) {
		    return baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.${defaultFormat}`) + query;
		}
	    }

	    return baseUrl + `.${defaultFormat}` + query;

	}	
		
		
		
		
		
		
		
		
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
	CommandName: ["banner"]


};



