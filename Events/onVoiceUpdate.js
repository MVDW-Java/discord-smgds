const imports = require('../imports');


imports.bot.on("voiceStateUpdate", async (oldMember, newMember) => {
	
	
	for (let [k, v] of imports.ModuleImports.entries()) {
		if(imports.ModuleType.get(k) == "onvoiceleave"){

			imports.ModuleImports.get(k).run(oldMember, newMember);
			
		}
	}
	
	
});