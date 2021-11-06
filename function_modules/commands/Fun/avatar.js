
const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');



const Discord = require('discord.js');


module.exports = {

	// Avatar Command - Yoshiko2000
	run: function AvatarCommand(msg, args) {


		



		var userMention = glofunc.GetSingleMentionAfterCommandUsage(msg);

		var embeddedmsg = new Discord.MessageEmbed()
			.setColor("#ff3355")
			.setFooter("Requested by " + msg.author.tag + ".", msg.author.avatarURL())
			.setTimestamp();

		if (userMention == null) {
			embeddedmsg.title = ":bust_in_silhouette: " + msg.author.username + "'s Avatar";
			embeddedmsg.setImage(msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: "png" }));
			msg.channel.send(embeddedmsg);
		} 
		else {

			var userAcctID = userMention.substr(0, userMention.length - 1);
			if (userAcctID.includes("!")){
				userAcctID = userAcctID.substr(3);
			}
			else {
				userAcctID = userAcctID.substr(2);
            }

			msg.guild.members.fetch(userAcctID);	// move the data of the member to cache if it's not.
			var userObject = msg.guild.members.cache.get(userAcctID);	//get the data from the cache, that you just stored with .fetch

			if (userObject) {
				embeddedmsg.title = ":bust_in_silhouette: " + userObject.displayName + "'s Avatar";
				embeddedmsg.setImage(userObject.user.displayAvatarURL({ dynamic: true, size: 1024, format: "png" }));
				msg.channel.send(embeddedmsg);
				
			}
			else {
				msg.channel.send("There has been an issue in retrieving that Avatar of the requested user. Please check the name or ID and try again. You can always mention the user to get their avatar. For example >>Avatar <UserMention>");
            }

			// you can do any data you want with userObject.

			//msg.guild.members.fetch(userAcctID).then(memberInGuild => {
			//	const getTheMemberAsUser = memberInGuild.user;
			//	// you can also do it like this but you will have to work in the fetch itself.
			//}); 

			
			
		}

		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["avatar"]


};



