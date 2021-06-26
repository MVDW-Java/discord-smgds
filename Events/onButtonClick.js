const imports = require('../imports');

imports.bot.on('clickButton', async (button) => {
	
	if(!button.clicker.user){
		return;
	}
	
	
	
	
	for (let [k, v] of imports.ModuleImports.entries()) {
		if(imports.ModuleType.get(k) == "clickbutton"){
			
			await imports.ModuleImports.get(k).run(button);
			
		}
	}
	await button.defer();
	await button.reply.fetch();
});