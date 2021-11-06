const imports = require('../imports.js');

imports.bot.on('guildCreate',  async guild => {

	for (let [k, v] of imports.ModuleImports.entries()) {
		if(imports.ModuleType.get(k) == "botjoinguild"){
			
			imports.ModuleImports.get(k).run(guild);
			
		}
	}
});
