const Discord = require('discord.js')

module.exports = {
	Discord: require('discord.js'),
	bot: new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
	dispatcher: null,
	image_channels: [],
	mute_role: "",
	vote_skip_song: [],
	message_queue: new Map(),
	active_chat: new Map(),
	last_minigame_send: 0,
	minigame_active: -1,
	minigame_last: 0,
}