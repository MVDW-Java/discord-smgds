const imports = require('../imports');


imports.bot.on('messageDelete', async msg => {
	if (!msg.guild) return;

	
	const fetchedLogs = await msg.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();
	const { executor, target } = deletionLog;
	
	
	for (let [k, v] of imports.ModuleImports.entries()) {
		if(imports.ModuleType.get(k) == "messagedelete"){

			imports.ModuleImports.get(k).run(msg, deletionLog, executor, target);
			
		}
	}
	
});