const imports = require('../../../imports');
var glofunc = require('../../../globalfunctions');
const Discord = require('discord.js');
var fs = require('fs');

module.exports = {

	run: async function SimpleCommand(msg, args) {

		const voiceChannel = msg.member.voice.channel;
		if (!voiceChannel) {
			msg.channel.send("You need to be in a voice channel to play music!");
			return;
		}

		const permissions = voiceChannel.permissionsFor(msg.client.user);

		if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
			msg.channel.send("I need the permissions to join and speak in your voice channel!");
		}


		var brstm = require('brstm').Brstm(fs.readFileSync("./assets/music/test.brstm"));


		voiceChannel.join().then(connection => {
			const stream = connection.play(brstm.getSamples(0, 100));

			stream.on("finish", () => {
				
			});
		});
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["brstm"]


};