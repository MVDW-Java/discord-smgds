const Discord = require('discord.js')

module.exports = {
	Discord: require('discord.js'),
	bot: new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
	dispatcher: null,
	image_channels: []
}