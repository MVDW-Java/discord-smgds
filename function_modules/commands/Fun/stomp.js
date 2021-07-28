const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const globalVars = require('../../../globalvars');
const Discord = require('discord.js');
const axios = require('axios');
const enemy_file = require('../../../assets/enemy.json');

module.exports = {

	run: function run(msg, args) {
		
		
		if(globalVars.minigame_active == -1 || globalVars.minigame_type !== 1){
			msg.channel.send("There is no enemy to stomp on.\n\n[DEBUG] minigame_active:" + globalVars.minigame_active + "\nminigame_type: " + globalVars.minigame_type);
			return;
		}
		

		if(globalVars.death_users.includes(msg.author.id)){
			msg.channel.send("You're already death.");
			return;
		}
		
		if(!enemy_file[globalVars.minigame_active].can_stomp){
			msg.channel.send("you can't stomp on this enemy.");
			return;
		}
		
		
		
		
		
		
		glofunc.con.query("SELECT * FROM users WHERE discord_id='" + msg.author.id + "'", function (err1, result1) {
			
			
			//default values
			var coins = 0;
			var starbits = 0;
			var health = 3;
			var death_count = 0;
			var death = false;
			var already_in_db = false;
			
			//get user health/lifes.
			if(result1.length !== 0) {
				coins = result1[0].coins;
				starbits = result1[0].starbits;
				health = result1[0].health;
				death_count = result1[0].death_count;
				already_in_db = true;
			}
			
			if(enemy_file[globalVars.minigame_active].damage_stomp){
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
					sql = "UPDATE users SET health='" + health + "', death_count='" + death_count + "' WHERE discord_id='" + msg.author.id + "'";
				}

				glofunc.con.query(sql, function (err1, result1) {
					if(err1) msg.channel.send(err1);
					
					if(death){
						msg.channel.send("you died.");
					} else {
						msg.channel.send("you have " + health + " health bar(s) left.");
					}
					
				
				});
			} else {
				
			
				
		
				var reward_give = enemy_file[globalVars.minigame_active].reward_amount_stomp;
				
				if(health == 2 && enemy_file[globalVars.minigame_active].reward_type_stomp == 0) {
					reward_give = reward_give - 1;
				} else if(health == 1 && enemy_file[globalVars.minigame_active].reward_type_stomp == 0) {
					reward_give = reward_give - 2;
				}
				
				if(enemy_file[globalVars.minigame_active].reward_type_stomp == 0){
					health = 3;
					coins = coins + reward_give;
				} else if(enemy_file[globalVars.minigame_active].reward_type_stomp == 1){
					starbits = starbits + reward_give;
				}
				

			
			
				var sql = "INSERT INTO users (discord_id, coins, starbits, health, death_count) VALUES ('" + msg.author.id + "','" + coins + "', '" + starbits + "', '3', '0')";
				
				if(already_in_db){
					sql = "UPDATE users SET coins='" + coins + "', starbits='" + starbits + "', health='" + health + "' WHERE discord_id='" + msg.author.id + "'";
				}

				glofunc.con.query(sql, function (err1, result1) {
					if(err1) msg.channel.send(err1);
					
					if(enemy_file[globalVars.minigame_active].reward_type_stomp == 0){
						msg.channel.send("<@!" + msg.author.id + "> you defeated a " + enemy_file[globalVars.minigame_active].name + "\nYou earned '" + reward_give + "' coins.");
					} else if(enemy_file[globalVars.minigame_active].reward_type_stomp == 1){
						msg.channel.send("<@!" + msg.author.id + "> you defeated a " + enemy_file[globalVars.minigame_active].name + "\nYou earned '" + reward_give + "' starbits.");
					}
				});
				
				globalVars.minigame_active = -1;
			}
		});
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["stomp"]
};