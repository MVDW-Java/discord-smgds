const imports = require('../../../imports');
const glofunc = require('../../../globalfunctions');
const vars = require('../../../globalvars');
const Genius = require("genius-lyrics");
const Client = new Genius.Client();

module.exports = {

	run: async function(msg, args) {
	
		const searches = await Client.songs.search(args.join(" "));
		console.log(searches);
		const firstSong = searches[0];


		// Ok lets get the lyrics
		const lyrics = await firstSong.lyrics();
		msg.channel.send(lyrics);
	
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: true,
	CommandWhitelist: ["834518897549508649"],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["lyrics"]


};