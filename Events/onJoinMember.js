const imports = require('../imports.js');

imports.bot.on('guildMemberAdd', member => {
	console.log("Trigger event");
	
	for (let [k, v] of imports.ModuleImports.entries()) {
		if(imports.ModuleType.get(k) == "memberjoin"){
			console.log("Found event");
			imports.ModuleImports.get(k).run(member);
			
		}
	}
});
