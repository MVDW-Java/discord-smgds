//requirements from other files.
/*const imports = require('../../imports');
const globalVars = require('../../globalvars');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg) {
		
		var usr = msg.guild.members.cache.get(msg.author.id); //Get guild user from message user(Why is this a thing)
		var messages_queue = globalVars.message_queue.get(msg.channel.id);
	
		//Dev role id || Mod role id
		if(usr.roles.cache.has("775382408505458769") ||usr.roles.cache.has("851043549155426325")){
			return; //No tracking for staff, requested by Gericom
		}
		
		//TODO: This is the old way of fetching messages resulting in lots of ratelimits.
		//      Custom message fetch system will be under imports.message_queue
		


		const sentance_triggers = [
		
			"black 'people'",
			"jewish 'people'",
			"dirty jew",
			"greedy jew",
			"jews are greed",
			"jew is greed",
			"jews are fucking greed",
			"fuck jew",
			"Becouse they are Jews",
			"you are a jew",
			"you are jew",
			"shit it jew",
			"shut it jew",
			"shutup jew",
			"fucking jew",
			"i already hated on the jew",
			"dumb jew",
			"Damn jews",
			"MVDW is a jew",
			"thats a very jew thing to say",
			"that's a very jew thing to say",
			"fuck nigger",
			"i hate jews",
			"i hate the jews",
			"i cant stand jews",
			"i can't stand jews",
			"i cant stand the jews",
			"i can't stand the jews",
			"jews takes jobs",
			"jews take job",
			"jew takes jobs",
			"jew take job",
			"jews steal",
			"jew took my job",
			"jew took his job",
			"jews took my job",
			"jews took his job",
			"jews killed",
			"jews are dumb",
			"jew dumb",
			"jews dumb",
			"gas the jew",
			"gas that jew",
			"beware the jew",
			"beware of jew",
			"gas jews",
			"if i were to compare them to anything, it'd probably be jews",
			"gassing jews",
			"kill your self",
			"retard",
			"since jews dont count as people",
			"jews arent people",
			"jews arent 'people'",
			"I support the holocaust",
			"jews are destroying",
			"my little jew",
			"jews lie all the time",
			"jews aren't white",
			"jews arent white",
			"worse than the jews",
			"me when im older the traditional type of jew",
			"United jews of America",
			"the jews duh",
			"jew moment",
			"you're a jew",
			"you are a jew",
			"But if you want to gas only the jews",
			"no jews allowed",
			"you jew",
			"you dirty jew",
			"you fucking you",
			"you are a fucking jew",
			"you are a dirty jew",
			"shut up",
			"why are you black",
			"this is a message filtering test MVDWTESTPLAYGROUND",
			"kill yourself",
			"nigger",
			"whore",
			"Santa Claus and Hitler mixed be like:Ho ho holocaust",
			"hitler is a hero",
			"hitler is my hero"
			
		];
		
		const non_formatted_triggers = [];
		
		
		
		
		var exact_triggers = [
		
			"jews"
		
		];
		
		var context_bypass = [
		
			["saying things like"],
			["saying", "is"],
			["saying stuff like"],
		
		
		];
		
		var triggered = false;
		var whitelist = "abcdefghijklmnopqrstuvwxyz'";
		var replacement_a = "∀âáàȁấầẩāãäǟåǻǻăặȃąǎȧǡḁạảẚÀȀÁÂẤẦẨĀÃÄǞÅǺǺĂẶȂĄǍȦǠḀẠẢẫằằẳẳẵẵắắậậαɑⒶ₳ª𠔀@ɐ⍺𝖆𝔞";
		var replacement_b = "阝ḂḃḄḅḆḇɃƀᵬᶀƁɓƂƃβƄʙɓ";
		var replacement_e = "ëēęèéêė";
		
		var chat = "";
		

		for (var i = 0; i < messages_queue.length; i++){
			if(messages_queue[i].author == msg.author.id){
				chat = messages_queue[i].msg.content.toLowerCase() + chat;
				//console.log("LMAO: " + messages_queue[i].msg);
			}
		}
		
		

		
		
		var regex_whitelist = new RegExp('[^' + whitelist + ']', 'g');
		var regex_filter_a = new RegExp('[' + replacement_a + ']', 'g');
		var regex_filter_b = new RegExp('[' + replacement_b + ']', 'g');
		
		
		chat = chat.replace(/[\"\`]/g, "'"); // filter " to '
		chat = chat.replace(regex_filter_a, "a"); // a filter
		chat = chat.replace(regex_filter_b, "b"); // a filter
		chat = chat.replace(regex_whitelist, '');

		for (var i in sentance_triggers){
			if(chat.includes(sentance_triggers[i].toLowerCase().replace(regex_whitelist, ''))) {triggered = true; console.log("AUTOMOD TRIGGER(sentance_triggers): " + sentance_triggers[i]);} 
		}
	
		for (var i in non_formatted_triggers){
			if(chat.includes(non_formatted_triggers[i].toLowerCase())) {triggered = true; console.log("AUTOMOD TRIGGER(non_formatted_triggers): " + non_formatted_triggers[i]);}
		}
	
		for (var i in exact_triggers){
			if(chat == exact_triggers[i].toLowerCase()) {triggered = true; console.log("AUTOMOD TRIGGER(exact_triggers): " + exact_triggers[i]);}
		}
		
		for (var i in context_bypass){
			var includes_valid = true;
			for (var i2 in context_bypass[i]){
				if(includes_valid){
					if(!chat.includes(context_bypass[i][i2])) includes_valid = false;
				}
			}
			if(includes_valid) triggered = false;
		}
	
	
		
		
		
		if(triggered){
			msg.delete();

			/*var usr = msg.guild.member(msg.author);
			usr.roles.add(msg.guild.roles.cache.get(globalVars.mute_role)).catch(console.error);
			
			
			
			usr.roles.remove(msg.guild.roles.cache.get("845015697942773824")).catch(console.error); //anime role
			usr.roles.remove(msg.guild.roles.cache.get("845031040938672162")).catch(console.error); //political role */ /*

			
			var embed = new Discord.MessageEmbed()
			.setColor("#ff3355")
			.setTitle(":shield: Content removed by auto moderation.")
			.setDescription("Hey there <@!" + msg.author.id + ">,\n\n" +
			"We sadly have to remove your message for saying things that is against the rules.\n" +
			"We take protection to our community very seriously and keep the chat clean as possible.\n")
			.setFooter("If you believe your post got false flagged, DM the bot creator MVDW#0001.")
			.setTimestamp();
			
			msg.channel.send(embed);
			messages_queue[0].msg.content = "";
		}
		

	
	},
	ModuleType: "messagelistener",
	MessageTriggerCommand: true,
	MessageTriggerDM: false
	
}
