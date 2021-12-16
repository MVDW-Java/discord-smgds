const imports = require('../imports');

imports.bot.on('interactionCreate',  async (interaction) => {
	if (interaction.isButton()){
		for (let [k, v] of imports.ModuleImports.entries()) {
			if(imports.ModuleType.get(k) == "clickbutton"){
				
				await imports.ModuleImports.get(k).run(interaction);
				
			}
		}
	}
});
