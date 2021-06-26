var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {

		glofunc.con.query("SELECT * FROM users WHERE discord_id='" + msg.author.id + "'", function (err1, result1) {
			
			var coins = 0;
			var starbits = 0;
			var health = 3;
			var death_count = 0;


			if(result1.length !== 0){
				coins = result1[0].coins;
				starbits = result1[0].starbits;
				health = result1[0].health;
				death_count = result1[0].death_count;
			}			
			
			
			//console.log(result1);
			msg.channel.send("Your user information:\nCoins: '" + coins + "'\nStarbits: '" + starbits + "'\nHealth: '" + health + "'\nDeath Count: '" + death_count + "'");
		});


	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["profile", "me"]
};