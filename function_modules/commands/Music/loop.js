const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");

module.exports = {

	run: async function SimpleCommand(msg, args) {
		const serverQueue = imports.MusicQueue.get(msg.guild.id);
		if (!serverQueue){
			msg.channel.send('There is nothing playing right now.');
			return;
		}

		if(imports.MusicLoop){
			imports.MusicLoop = false;
			msg.channel.send("Loop removed.");
		} else {
			imports.MusicLoop = true;
			const serverQueue = imports.MusicQueue.get(msg.guild.id);
			msg.channel.send(":repeat_one: Song ``" + imports.MusicQueue.get(msg.guild.id)["songs"][0]["title"] + "`` looped.");
		}
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["loop"]


};