var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {

		glofunc.con.query("INSERT INTO users (discord_id, coins) VALUES ('" + msg.author.id + "','0') ON DUPLICATE KEY UPDATE coins=coins + 1", function (err1, result1) {
			if(err1) msg.channel.send(err1);
				
			console.log(result1);
			msg.channel.send("You have '" + result1[0].coins + "' coins in your wallet.");
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