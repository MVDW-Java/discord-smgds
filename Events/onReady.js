const imports = require('../imports');

imports.bot.on('ready', () => {
	console.info(`Logged in as ${imports.bot.user.tag}!`);
	imports.bot.user.setActivity("!help for help", {type:"WATCHING"});
});