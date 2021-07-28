//requirements from other files.
const imports = require('../../imports');
const globalVars = require('../../globalvars');
const Discord = require('discord.js');
const quiz_file = require('../../assets/quiz.json');
const enemy_file = require('../../assets/enemy.json');

module.exports = {

	run: function run(msg) {
		
		var usr = msg.guild.member(msg.author.id); //Get guild user from message user(Why is this a thing)
		
		//quick dirty patch(I am tiered man)
		if(msg.channel.id == "775377505472348173" || msg.channel.id == "785812534065496086" || msg.channel.id == "834518897549508649") return;
		
		
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
			
			
				gamble = Math.floor((Math.random() * 2));
			
				switch(gamble){
					case 0:
						var select_quiz = getRandomMinigame(quiz_file);
						
						globalVars.minigame_active = select_quiz;
						globalVars.minigame_type = 0;
						globalVars.death_users = []; // Reset death users.
						
						
						var embed = new Discord.MessageEmbed()
							.setTitle("Quiz:")
							.setColor("#2ecc71")
							.setDescription(quiz_file[select_quiz].question)
							.setImage(quiz_file[select_quiz].image)
							.setFooter("Use command``!quiz <your answer>`` to answer.");

						msg.channel.send(embed);
					break;
					case 1:
						var select_enemy = getRandomMinigame(enemy_file);
						
						globalVars.minigame_active = select_enemy;
						globalVars.minigame_type = 1;
						globalVars.death_users = []; // Reset death users.
						
						var embed = new Discord.MessageEmbed()
							.setTitle("Enemy:")
							.setColor("#2ecc71")
							.setDescription(enemy_file[select_enemy].name)
							.setImage(enemy_file[select_enemy].image_url)
							.setFooter("Use the command ``!stomp`` or ``!spin`` ");
						msg.channel.send(embed);
						
						
						
					break;
				
				}
			
				//msg.channel.send("[DEBUG]: Hey <@!481895822624161795>!!! check if values are correct in console :)");
			}
			
			
		}
		
		function getRandomMinigame(file){

			var select_quiz = -1;
			
			while(select_quiz == -1 || select_quiz == globalVars.minigame_last){
				select_quiz = Math.floor((Math.random() * file.length));
			}
			
			
			return select_quiz;
		}
		
		
	
	},
	ModuleType: "messagelistener",
	MessageTriggerCommand: true,
	MessageTriggerDM: false
	
}