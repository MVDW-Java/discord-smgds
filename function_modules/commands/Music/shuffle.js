const globalVars = require('../../../globalvars');
const Discord = require('discord.js');

module.exports = {

	run: async function SimpleCommand(msg, args) {
		var serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		if (!serverQueue || serverQueue.songs.length == 0){
			msg.channel.send('There is no queue.');
			return;
		}

        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // 0    -> nothing to shuffle
        // 1..2 -> shuffling does nothing
        if (serverQueue.songs.length > 2) {
            var remaining = serverQueue.songs.splice(1);

            shuffleArray(remaining);
            serverQueue.songs = serverQueue.songs.splice(0, 1).concat(remaining);
        }
		var queue_description = "";
		var queue_counter = 1;
		
		serverQueue.songs.forEach(element => {
			queue_description = queue_description + "\n\n" + queue_counter + ". \`\`" + element.title + "\`\`";
			queue_counter++;
		});
		const queue = new Discord.MessageEmbed()
			.setColor('#2ecc71')
			.setTitle(':1234: Queue:')
			.setDescription(queue_description);

			
		msg.channel.send({ embeds: [queue] });
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["shuffle"]


};