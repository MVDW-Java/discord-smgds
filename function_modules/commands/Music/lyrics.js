const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
//const Genius = require("genius-lyrics");
//const Client = new Genius.Client();

module.exports = {

	run: async function(msg, args) {
		msg.channel.send(":warning: Due the recode this function is not ready yet.");
		return;
		/*
		const searches = await Client.songs.search(args.join(" "));
		console.log(searches);
		const firstSong = searches[0];


		// Ok lets get the lyrics
		const lyrics = await firstSong.lyrics();
		msg.channel.send(lyrics);*/
	
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649", "885543263111639061", "815586562083520556", "819950156928778260", "605567744720633886"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["lyrics"]


};