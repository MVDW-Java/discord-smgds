var glofunc = require('../../../globalfunctions');
var vars = require('../../../globalvars');
const Discord = require('discord.js');

module.exports = {

	run: function run(msg, args) {
        const serverQueue = vars.MusicQueue.get(msg.guild.id);
        const np = serverQueue.songs[0];
        msg.channel.send("[DEBUG] URL: " + np.url);
        msg.channel.send("[DEBUG] Type: " + np.type);

	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["debug"]
};
