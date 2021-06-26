//requirements from other files.
const imports = require('../../imports');
const globalVars = require('../../globalvars');
const Discord = require('discord.js');
const quiz_file = require('../../assets/quiz.json');

module.exports = {

	run: function run(msg) {
		
		var usr = msg.guild.member(msg.author.id); //Get guild user from message user(Why is this a thing)
		
		//if(msg.channel.id !== "775438064339910707") return;
		
		
		
		var messages_queue = globalVars.message_queue.get(msg.channel.id);
		var unix_time_now = Date.now();
		

		//Check if there already is a message send.
		if(!globalVars.active_chat.has(msg.channel.id)){
			globalVars.active_chat.set(msg.channel.id, unix_time_now);
			return;
		}
		
		
		
		//Chat lenght good?
		if(!messages_queue[1].msg.createdTimestamp){
			return;
		}
		
		
		// Is last message good enough
		var last_message_time = unix_time_now - messages_queue[1].msg.createdTimestamp;
		
		
		
		console.log("last message time ago22 : " + last_message_time);
		if(unix_time_now - messages_queue[1].msg.createdTimestamp > 120000){
			globalVars.active_chat.set(msg.channel.id, unix_time_now);
			return;
		}
		
		if(unix_time_now - globalVars.active_chat.get(msg.channel.id) < 120000){
			return;
		}
		
		
		if(unix_time_now - globalVars.last_minigame_send > 120000){
			
			var gamble = Math.floor((Math.random() * 20) + 1);
			
			
			if(gamble == 7){ // Lucky 7 :)
			
				globalVars.last_minigame_send = unix_time_now;
			
			
			
				var select_quiz = getRandomQuiz();
				
				globalVars.minigame_active = select_quiz;
				
				const embed = new Discord.MessageEmbed()
					.setTitle(quiz_file[select_quiz].question)
					.setColor("#2ecc71")
					.setDescription("If you guess correctly you win 5 to 10 coins!\n\n*Use command``!quiz <your answer>`` to answer.*")
					.setImage(quiz_file[select_quiz].image)
				msg.channel.send(embed);
			
				//msg.channel.send("[DEBUG]: Hey <@!481895822624161795>!!! check if values are correct in console :)");
			}
			
			
		}
		
		function getRandomQuiz(){

			var select_quiz = -1;
			
			while(select_quiz == -1 || select_quiz == globalVars.minigame_last){
				select_quiz = Math.floor((Math.random() * quiz_file.length));
			}
			
			
			return select_quiz;
		}
		
		
	
	},
	ModuleType: "messagelistener",
	MessageTriggerCommand: true,
	MessageTriggerDM: false
	
}