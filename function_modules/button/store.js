const imports = require('../../imports');
var glofunc = require('../../globalfunctions');
const Discord = require('discord.js');
const fs = require("fs");
var request = require('request');
var sha512 = require('js-sha512');
const axios = require('axios');


module.exports = {
	
	run: async function run(button) {
		
		var buttons = ["store-item1", "store-item2", "store-item3", "store-item4"];
		
		
		if(!buttons.includes(button.id)){
			return;
		}

		var channel = imports.bot.channels.cache.get(button.channel.id);
		
		
		glofunc.con.query("SELECT * FROM users WHERE discord_id='" + button.clicker.user.id + "'", function (err1, result1) {
			
			var coins = 0;
			var price = 0;
			var death_count = 0;
			var item_name;
			
			if(result1.length !== 0){
				coins = result1[0].coins;
				death_count = result1[0].death_count;
			}
			

			switch(button.id){
				case "store-item1":
					price = 250 + (death_count * 25);
					item_name = "5 card pack";
					break;
				case "store-item2":
					price = 450 + (death_count * 25);
					item_name = "10 card pack";
					break;
				case "store-item3":
					price = 700 + (death_count * 25);
					item_name = "15 card pack";
					break;
				case "store-item4":
					price = 850 + (death_count * 25);
					item_name = "20 card pack";
					break;
			}
			
			if(price > coins){
				let guild = imports.bot.guilds.cache.get(button.guild.id);
				guild.members.cache.get(button.clicker.user.id).send("Hey there <@!" + button.clicker.user.id + ">, but you don't have enough coins to buy the item '" + item_name + "'");
				return;
			}

		
			
			channel.send("You can't buy cards yet, sorry : (");
		});
	},
	ModuleType: "clickButton"

};



