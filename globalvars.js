const { Client } = require("discord.js");
const { Intents } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
	Discord: require('discord.js'),
	bot: new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'],  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
	audioPlayer: null,
	audioResource: null,
	music_djonly: false,
	image_channels: [],
	mute_role: "",
	vote_skip_song: [],
	MusicQueue: new Map(),
	message_queue: new Map(),
	active_chat: new Map(),
	last_minigame_send: 0,
	minigame_active: -1,
	minigame_type: 0,
	minigame_last: 0,
	death_users: []
}
