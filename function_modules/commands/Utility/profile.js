var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {

		glofunc.con.query("SELECT * FROM users WHERE discord_id='" + msg.author.id + "'", function (err1, result1) {
			
			var coins = 0;
			if(result1.length !== 0) coins = result1[0].coins;
			
			
			
			//console.log(result1);
			msg.channel.send("You have '" + coins + "' coins in your wallet.");
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