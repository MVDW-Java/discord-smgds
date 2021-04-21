const imports = require('../imports');

imports.bot.on('messageReactionAdd',  async (reaction, user) => {

	if(user.bot) return;
	
	
	//fetch reactions
	if (reaction.partial) {

		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	for (let [k, v] of imports.ModuleImports.entries()) {
		if(imports.ModuleType.get(k) == "reactionlistener"){

			if(!reaction.message.guild) return;
			imports.ModuleImports.get(k).run(reaction, user);
			
		}
	}
});