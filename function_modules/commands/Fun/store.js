const glofunc = require('../../../globalfunctions');
const imports = require('../../../imports');
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const Canvas = require("canvas");

module.exports = {

	run: function run(msg, args) {		
		
		const usr = msg.guild.member(msg.author.id);


		let button_pack1 = new disbut.MessageButton()
			.setLabel("Buy 5 pack")
			.setStyle("blurple")
			.setID("store-item1");
			
		let button_pack2 = new disbut.MessageButton()
			.setLabel("Buy 10 pack")
			.setStyle("blurple")
			.setID("store-item2");
			
		let button_pack3 = new disbut.MessageButton()
			.setLabel("Buy 15 pack")
			.setStyle("blurple")
			.setID("store-item3");
			
		let button_pack4 = new disbut.MessageButton()
			.setLabel("Buy 20 pack")
			.setStyle("blurple")
			.setID("store-item4");


		const canvas = Canvas.createCanvas(750, 394);
		const ctx = canvas.getContext('2d');
		
		//Register font
		Canvas.registerFont('./assets/fonts/SuperMario256.ttf', { family: "visitor" });
		Canvas.registerFont('./assets/fonts/marioscripttext.ttf', { family: "visitor" });
		
		glofunc.con.query("SELECT * FROM users WHERE discord_id='" + msg.author.id + "'", function (err1, result1) {
			
			var death_count = 0;
			var coins = 0;
			
			if(result1.length !== 0){
				coins = result1[0].coins;
				death_count = result1[0].death_count;
			}
			
			//Render avatar
			Canvas.loadImage(usr.user.displayAvatarURL({ dynamic: true, size: 1024, format: "png" })).then(avatar_img => {
				ctx.drawImage(avatar_img, 6, 6, 64, 64);
				
				
				
				Canvas.loadImage('./assets/images/card-store.png').then(bg_img => {
					ctx.drawImage(bg_img, 0, 0, canvas.width, canvas.height);
					ctx.font = "42px Super Mario 256";
					ctx.fillStyle = "white";
					ctx.fillText(usr.user.username, 76, 36);
					
					ctx.font = "36px mario script text";
					ctx.fillStyle = "#f7d804";
					ctx.fillText(coins, 110, 68);
					
					ctx.textAlign = "center";
					var i = 0;
					var pos = 116;
					while (i < 4) {
					
						var price = 0;
						
						
						switch(i){
							case 0:
								price = 250 + (death_count * 25);
								break;
							case 1:
								price = 450 + (death_count * 25);
								break;
							case 2:
								price = 700 + (death_count * 25);
								break;
							case 3:
								price = 850 + (death_count * 25);
								break;
						}
						
						
						if(price > coins){
							ctx.fillStyle = "#e91644";
							switch(i){
								case 0:
									button_pack1.setDisabled();
									button_pack1.setStyle("grey")
									break;
								case 1:
									button_pack2.setDisabled();
									button_pack2.setStyle("grey")
									break;
								case 2:
									button_pack3.setDisabled();
									button_pack3.setStyle("grey")
									break;
								case 3:
									button_pack4.setDisabled();
									button_pack4.setStyle("grey")
									break;
							}
							
							
							
						}
						ctx.fillText(price, pos, 378);
						pos = pos + 172;
						i++;
					}
					
					
					
					let buttonRow1 = new disbut.MessageActionRow()
						.addComponent(button_pack1)
						.addComponent(button_pack2)
						.addComponent(button_pack3)
						.addComponent(button_pack4);
					
					
					
					const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'card.png');
					console.log(attachment);
					msg.channel.send("", { files: [attachment], component: buttonRow1});
					
				});
			});
			
		
		});
		
		
		
		
	},
	ModuleType: "command",
	Permissions: 0,
	CommandToggleWhitelist: false,
	CommandWhitelist: [],
	CommandRunGuild: true,
	CommandRunDM: false,
	CommandName: ["store"]
};