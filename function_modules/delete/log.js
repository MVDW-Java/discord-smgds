const imports = require('../../imports');
const Discord = require('discord.js');

module.exports = {

	run: async function(msg, deletionlog, executor, target) {
		
		const channel = imports.bot.channels.cache.get("863833243252949003");
		
		if (!deletionlog){
			channel.send(`[LOG][DEV]:  ${msg.author.tag} was deleted, but no relevant audit logs were found.`);
			return;
		}
		
		
		var executer_id;
		var executer_tag;
		
		
		if (target.id === msg.author.id) {
			executer_id = executor.id;
			executer_tag = executor.tag;
		} else {
			executer_id = msg.author.id;
			executer_tag = msg.author.tag;
		}
		
		
		
		
		var delete_embed = new Discord.MessageEmbed()
				.setColor('#ff0000')
				.setTitle(":wastebasket:｜Message Deleted in #" + msg.channel.name)
				.addField("Author:", "<@!" + msg.author.id + "> (" + msg.author.tag + ")", true)
				.addField("Executer:", "<@!" + executer_id + "> (" + executer_tag + ")", true)
				.addField("Content:", msg.content, false);

			
		channel.send(delete_embed);
		
	},
	ModuleType: "messagedelete",
};