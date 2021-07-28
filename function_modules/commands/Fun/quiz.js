const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const globalVars = require('../../../globalvars');
const Discord = require('discord.js');
const axios = require('axios');
const quiz_file = require('../../../assets/quiz.json');

module.exports = {

	run: function run(msg, args) {
		
		if(args.length == 0){
			msg.channel.send("Please fill in your answer");
			return;
		}
		
		
		
		var whitelist = "abcdefghijklmnopqrstuvwxyz";
		var regex_whitelist = new RegExp('[^' + whitelist + ']', 'g');
		var user_answer = args.join("").toLowerCase();
		user_answer = user_answer.replace(regex_whitelist, '');
		
		
		if(globalVars.minigame_active == -1 || globalVars.minigame_type !== 0){
			msg.channel.send("There is no quiz active.");
			return;
		}
		
		
		
		if(globalVars.death_users.includes(msg.author.id)){
			msg.channel.send("You**'re** already death.");
			return;
		}
		
		
		glofunc.con.query("SELECT * FROM users WHERE discord_id='" + msg.author.id + "'", function (err1, result1) {
			
			
			//default values
			var coins = 0;
			var health = 3;
			var death_count = 0;
			var death = false;
			var already_in_db = false;
			
			//get user health/lifes.
			if(result1.length !== 0) {
				coins = result1[0].coins;
				health = result1[0].health;
				death_count = result1[0].death_count;
				already_in_db = true;
			}
					

			
			if(user_answer == quiz_file[globalVars.minigame_active].answer){
				
				var coins_give = Math.floor(Math.random() * (10 - 5) ) + 5;
				
				if(health == 2) {
					coins_give = coins_give - 1;
				} else if(health == 1) {
					coins_give = coins_give - 2;
				}
				
				health = 3;
				coins = coins + coins_give;
				

			
			
				var sql = "INSERT INTO users (discord_id, coins, starbits, health, death_count) VALUES ('" + msg.author.id + "','" + coins + "', '0', '3', '0')";
				
				if(already_in_db){
					sql = "UPDATE users SET coins='" + coins + "', health='" + health + "' WHERE discord_id='" + msg.author.id + "'";
				}

				glofunc.con.query(sql, function (err1, result1) {
					if(err1) msg.channel.send(err1);
					
					msg.channel.send("<@!" + msg.author.id + "> has won!\nYou earned '" + coins_give + "' coins.");
				});
				
				globalVars.minigame_active = -1;
				
				
				
			} else {
				
					

				//wrong answer given, remove 1 health bar.
				health--;
				
				//check if death.
				if(health < 0){
					death_count++;
					health = 3;
					globalVars.death_users.push(msg.author.id);
					death = true;
				}
				
				
				
				var sql = "INSERT INTO users (discord_id, coins, starbits, health, death_count) VALUES ('" + msg.author.id + "','0', '0', '2', '0')";
			
				if(already_in_db){
					sql = "UPDATE users SET coins='" + coins + "', health='" + health + "', death_count='" + death_count + "' WHERE discord_id='" + msg.author.id + "'";
				}

				glofunc.con.query(sql, function (err1, result1) {
					if(err1) msg.channel.send(err1);
					
					if(death){
						msg.channel.send("Wrong answer, you died.");
					} else {
						msg.channel.send("Wrong answer, you have " + health + " health bar(s) left.");
					}
					
				
				});
				
			}
		
		});
		
		
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["quiz"]
};