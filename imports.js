const Discord = require('discord.js')

//The bot login
module.exports = {
	Discord: require('discord.js'),
	bot: new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
	LevelSystemUserTimeout: new Map(),
	MusicQueue: new Map(),
	MusicLoop: false,
	CommandCooldown: new Map(),
	SetReddit: [],
	SetUm: [],
	message_duplicate: new Map(),
	message_duplicate_count: new Map(),
	LevelSystemBoost: 1,
	nsfw_all_stars_anti_spam: [],
}


/*    THIS IS HOW ITS GONNA WORK LATER, MOVE OVER TO GLOBAL VARS
const Discord = require('discord.js')

module.exports = {
	Discord: require('discord.js'),
	bot: new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
	ModuleImports: new Map(),
	ModuleType: new Map()
}*/