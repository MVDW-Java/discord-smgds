const glofunc = require('./globalfunctions');		// Global functions
const imports = require('./imports');				// Global imports
const globalvars = require('./globalvars');	

require('dotenv').config();

const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");
const path = require("path");



const DisTube = require('distube')
const SoundCloudPlugin = require('@distube/soundcloud')
const SpotifyPlugin = require('@distube/spotify')



const TOKEN = process.env.TOKEN;
var command_list = [];



// this is for cleaning up code and is called when the app exits or closes for any reason.
var cleanup = require('./cleanup').Cleanup(myCleanup);

function myCleanup() {
	console.log('Spoonful Bot Has Exited....');
};

//Bot login
var ModualNormalizedPath = require("path").join(__dirname, "function_modules");
//var CommandsNormalizedPath = require("path").join(__dirname, "Commands"); ///Deprecated///
var EventsNormalizedPath = require("path").join(__dirname, "Events");

glofunc.con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var isProductionMode = glofunc.CheckProductionMode();

//Setting all commands in maps - new
var mods_loaded = 0;
var mods_total = 0;

var arrayOfFiles = glofunc.GetAllFilesFromPath(ModualNormalizedPath);
arrayOfFiles.forEach(function (file) {
	mods_total++;

	process.stdout.write("\x1b[36m[" + mods_loaded + "/" + mods_total + "] \x1b[0mLoading up Module: " + file + "...");

	try {
		imports.ModuleImports.set(file, require(file));
		var type_module = imports.ModuleImports.get(file).ModuleType.toLowerCase();
		
		imports.ModuleType.set(file, type_module);
		
		mods_loaded++;
		process.stdout.write("   [ \x1b[32mOK\x1b[0m ] \n");
		if(type_module == "command"){
			var command_module = imports.ModuleImports.get(file).CommandName[0].toLowerCase();
			const command_builder = new SlashCommandBuilder().setName(command_module).setDescription('MVDW TEST ON ' + command_module);
			console.log(command_builder);
			command_list.push(command_builder);
		}

	} catch (e) {
		process.stdout.write("   [ \x1b[31mFAIL\x1b[0m ]\n");
		console.log(e);
		process.stdout.write("\x1b[31mERROR: The module '" + file + "' will not be loaded in, please fix the issue.\x1b[0m\n");
	}
});

//Getting all events
fs.readdirSync(EventsNormalizedPath).forEach(function (file) {
	process.stdout.write("Require listener: " + file + "...");
	
	try {
		require("./Events/" + file);
		process.stdout.write("   [ \x1b[32mOK\x1b[0m ]\n");
	} catch (e) {
		process.stdout.write("   [ \x1b[31mFAIL\x1b[0m ]\n");
		console.log(e);
		process.stdout.write("\x1b[31mERROR: The module '" + file + "' will not be loaded in, please fix the issue.\x1b[0m\n");
	}
});

console.log("Registering commands to server");
const rest = new REST({ version: '9' }).setToken(TOKEN);



rest.put(Routes.applicationCommands("830451181334954025"), { body: command_list })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);



if(mods_loaded == mods_total) {
	console.log("\x1b[36m[" + mods_loaded + "/" + mods_total + "] \x1b[32mEverything loaded up, logging into servers...\x1b[0m\n");
} else {
	console.log("\x1b[36m[" + mods_loaded + "/" + mods_total + "] \x1b[33mWARNING: Not all modules seem to be loaded! We will try to continue but some things may be broken. logging into servers...\x1b[0m\n");
}
globalvars.distube =  new DisTube.default(imports.bot, {
	searchSongs: 1,
	searchCooldown: 30,
	leaveOnEmpty: false,
	emptyCooldown: 0,
	leaveOnFinish: false,
	leaveOnStop: false
})

setInterval(() => {
	globalvars.MusicQueue.forEach(function(guild){
		//console.log(guild);
	
		//const serverQueue = globalVars.MusicQueue.get(guild.id);
		if(guild.songs.length > 0){
			if (guild.songs[0].timeleft < guild.songs[0].length) guild.songs[0].timeleft++;
		}
	});
}, 1000);



imports.bot.login(TOKEN);

