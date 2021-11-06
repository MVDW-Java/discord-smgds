const imports = require('../imports');
const Discord = require('discord.js');

imports.bot.on('messageDelete', async msg => {
	if (!msg.guild) return;
	try {
		
		if (!msg.guild.me.permissions.has(Discord.Permissions.FLAGS.VIEW_AUDIT_LOG)) {
			console.log("server no permissions to view audit logs");
		} else {
	
		
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
		}
	} catch(e){
		console.log(e);
	}
	
});
