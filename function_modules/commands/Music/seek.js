const glofunc = require('../../../globalfunctions');
const globalVars = require('../../../globalvars');

module.exports = {

	run: async function SimpleCommand(msg, args) {
		
		
		const serverQueue = globalVars.MusicQueue.get(msg.guild.id);
		
		if (!serverQueue){
			msg.channel.send(':no_entry_sign: There is nothing playing right now.');
			return;
		}
		if (!msg.member.voice.channel){
			msg.channel.send(':no_entry_sign: You have to be in a voice channel to stop the music!');
			return;
		}
		
		if(args.length !== 1){
			msg.channel.send(":no_entry_sign: Invailid format, please put a vailid time as argument.\nExample: ``!seek 1:42``");
			return;
		}
		
		
		
		
		
		var vailid_seek_values = ":1234567890";
		var regex = new RegExp('[' + vailid_seek_values + ']', 'g');
		var check_if_null = args[0].replace(regex, '');
		
		if(check_if_null !== ""){
			msg.channel.send(":no_entry_sign: Invailid format, please put a vailid time as argument.\nExample: ``!seek 1:42``");
			return;
		}
		

		//msg.channel.send("[DEBUG MODE] : args[0]=" + args[0]);
		
		var a = args[0].split(':'); // split it at the colons
		var seconds = 0;
		if(a.length == 0){
			msg.channel.send("Please use a vailid time format(Example: 1:42)");
			return;
		} else if(a.length == 1){
			seconds = (a[0]); 
		} else if(a.length == 2){
			seconds = (+a[0]) * 60 + (+a[1]); 
		} else if(a.length == 3){
			seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
		}
		

		msg.channel.send(":fast_forward: Seeking to timestamp ``" + glofunc.toHHMMSS(parseInt(seconds)) + "``.");

		glofunc.PlaySong(msg.guild, serverQueue.songs[0], globalVars.MusicLoop, parseInt(seconds))

	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["seek", "forward"]


};