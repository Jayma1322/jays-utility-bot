const Discord = require('discord.js');
const tqdecoder = require('tqdecoder')
const bot = new Discord.Client();

var status = "bot.user.setActivity('for ;help in ' + bot.guilds.cache.size + ' servers!', {\ntype: 'WATCHING'\n});"

var blacklistedids = [0,1]
bot.on('ready', () => {
	bot.user.setActivity('for ;help in ' + bot.guilds.cache.size + ' servers!', {
		type: 'WATCHING'
	});
	console.log('bot up and running :D');
	setInterval(function() {
		eval(status)
	}, 30000);
});

var blacklistedEmbed = new Discord.MessageEmbed()
	.setTitle("Error!")
	.addField("Blacklisted!", "You have been blacklisted by the bot creator!")
	.setColor("ff0000")
	.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")

bot.on('guildCreate', guild => {
	var joinedEmbed = new Discord.MessageEmbed()
		.setTitle("Hi!")
		.addField('Info','As of right now there is no configuration but that will happen sooner or later!\nThank you for using Jay\'s Utility Bot! I appreciate it.')
		.addField('Get Started','To begin your *very intense* experience, type ;help or ;info!')
		.setColor("00ff00")
		.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
});

bot.on('message', msg => {
	if (msg.author.equals(bot.user)) return;

	if (!msg.content.startsWith(";")) return;

	if (blacklistedids.includes(msg.author.id)) {
		msg.channel.send(blacklistedEmbed);
	} else {
		var args = msg.content.substring(1).split(" ");
		var cmd = args[0].toLowerCase();

		switch(cmd) {

		case "info":
			var infoEmbed = new Discord.MessageEmbed()
				.setTitle("Info")
				.addField("Getting Started","To get started with Jay's Utility Bot, type ;help!")
				.addField("Moderation Features","Moderation commands are locked to role / user permissions, and you can only do things that you can do manually via right click or other options.")
				.addField("Bot Staff and Contributors","Main Bot Developer and Owner - <@287704540810182657>\nTranslateTQ Contributors:\n<@808094012741386281>\n<@651856567422943259>\n<@536963028810334232>")
				.setColor("FFFFFF")
				.setFooter("Thank you for using Jay's Utility Bot! Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
			msg.channel.send(infoEmbed)
			break;
		case "help":
			var helpEmbedDM = new Discord.MessageEmbed()
				.setTitle("So, you need help with this garbage bot? Prefix is ;")
				.addField("Info", "help - Lists all commands.\ninvite - Sends bot invite to your DMs, so you can add it to your own server.\nping - Gets bot latency, and API latency.\nuptime - Shows bot uptime in minutes.\nsupport - Sends invite to the bot's support server\nstaff - Lists staff / contributors of the bot.")
				.addField("Fun Commands", "8ball <question> - Answers any question in the world!!!! (with a few exceptions)")
				.addField("Moderation", "purge <amount> - Deletes the amount of messages you specify\nmute <mention> - Prevents user from speaking in channels.\nunmute <mention> - Allows user to speak in channels after muted.\nkick <mention> <reason> - Kicks the user you tag with the specified reason.\nban <mention> <reason> - Bans the user you tag with the specified reason.")
				.addField("Useful", "translatetq <string> - Translates typing quirks for those who cannot read them.")
				.setColor("00ff00")
				.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
			msg.channel.send("Check your DMs, " + "<@" + msg.author.id + ">");
			msg.author.send(helpEmbedDM);
			break;
		case "invite":
			msg.author.send("Thanks for being interested in the bot!\nYou can invite the bot with the link below!\nhttps://discord.com/oauth2/authorize?client_id=809452370550456386&scope=bot&permissions=24210502")
			msg.channel.send("Check your DMs, " + "<@" + msg.author.id + ">");
			break;
		case "ping":
			var datenow = Date.now();
			msg.channel.send('Loading!')
				.then(msg => {
					var pingEmbed = new Discord.MessageEmbed()
						.setTitle("Ping!")
						.addField('Here are the numbers!', "Bot Latency: " + Math.floor(Date.now() - datenow) + "ms.\nAPI Latency: " + bot.ws.ping + "ms.")
					msg.channel.send(pingEmbed);
					msg.delete();
				});
				break;
		case "server":
			msg.channel.send("Check your DMs, " + "<@" + msg.author.id + ">");
			msg.author.send("The support server is https://discord.gg/adha4a9yhE")
			break;
		case "support":
			msg.channel.send("Check your DMs, " + "<@" + msg.author.id + ">");
			msg.author.send("The support server is https://discord.gg/adha4a9yhE")
			break;
		case "purge":
			if (msg.guild === null) return;
			if (!args[1] || args[1] > 100) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Insufficient Parameters!")
					.addField(msg.author.tag, "You must include how many messages to delete! (limit 100)")
					.setColor("ff0000")
					.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
				msg.channel.send(errorEmbed);
			} else {
				if (!msg.member.permissions.toArray().includes("MANAGE_MESSAGES")) {
					var errorEmbed = new Discord.MessageEmbed()
						.setTitle("Insufficient Permissions!")
						.addField(msg.author.tag, "You must have MANAGE_MESSAGES to use this command!")
						.setColor("ff0000")
						.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
					msg.channel.send(errorEmbed);
				} else {
					msg.delete();
					var completedEmbed = new Discord.MessageEmbed()
						.setTitle("Messages Purged!")
						.addField(msg.author.tag, "Successfully purged " + args[1] + " messages!")
						.setColor("00ff00")
						.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
					setTimeout(function() {
						msg.channel.bulkDelete(args[1]);
						msg.channel.send(completedEmbed);
					}, 500);
				};
			};
			break;
		case "8ball":
			var text = args.slice(2).join(" ");
			if (text.toLowerCase().includes("die") || text.toLowerCase().includes("suicide") || text.toLowerCase().includes("kill myself") || text.toLowerCase().includes("end it all")) {
				msg.channel.send("I'm programmed not to say anything about that. Please don't hurt yourself. It's not worth it.")
			} else {
				let num = Math.floor(Math.random() * 14);
				switch (num) {
					case 0:
						msg.channel.send('I\'m not answering that you idiot')
						break;
					case 1:
						msg.channel.send('Yeah, why not')
						break;
					case 2:
						msg.channel.send('Without a doubt')
						break;
					case 3:
						msg.channel.send('Pee your pants right now :gun:')
						break;
					case 4:
						msg.channel.send('Okay')
						break;
					case 5:
						msg.channel.send('Could you possibly ask a stupider question?')
						break;
					case 6:
						msg.channel.send('No.')
						break;
					case 7:
						msg.channel.send('Definitely not')
						break;
					case 8:
						msg.channel.send('You\'re a moron')
						break;
					case 9:
						msg.channel.send('I don\'t know...')
						break;
					case 10:
						msg.channel.send('Ask me later I\'m sleeping')
						break;
					case 11:
						msg.channel.send('Your question is so stupid I do not want to answer it')
						break;
					case 12:
						msg.channel.send('Of course!')
						break;
					case 13:
						msg.channel.send('you\'re ugly no offense')
						break;
				}
			}
			break;
		case "kick":
			if (msg.guild === null) return;
			if (!msg.member.permissions.toArray().includes("KICK_MEMBERS")) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Insufficient Permissions!")
					.addField(msg.author.tag, "You must have KICK_MEMBERS to use this command!")
					.setColor("ff0000")
					.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
				msg.channel.send(errorEmbed);
			} else {
				if (!args[2]) {
					var errorEmbed = new Discord.MessageEmbed()
						.setTitle("Insufficient Parameters!")
						.addField(msg.author.tag, "You must tag 1 user, and add a reason! (reason can be however long)")
						.setColor("ff0000")
						.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
					msg.channel.send(errorEmbed);
				} else {
					var user = msg.mentions.members.first()
					if (!user || user.kickable == false) {
						var errorEmbed = new Discord.MessageEmbed()
							.setTitle("Insufficient Parameters!")
							.addField(msg.author.tag, "You must tag 1 user, and add a reason! (reason can be however long)\nThis may have also been an error, if you are sure you tagged the user correctly, retry.")
							.setColor("ff0000")
							.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
						msg.channel.send(errorEmbed);
					} else {
						var serverName = msg.guild.name
						var admin = msg.author.tag
						var kickreason = args.slice(2).join(" ");
						var kickedEmbed = new Discord.MessageEmbed()
							.setTitle(serverName)
							.addField("Kicked!", "You have been kicked from " + serverName + " by " + admin + " for " + kickreason)
							.setColor("ff0000")
							.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
						user.user.send(kickedEmbed)
							.catch(() => msg.channel.send('Failed to DM user kicked message.'));
						setTimeout(function() {
							user.kick("Kicked by" + admin + " | " + kickreason);
						}, 3000);
						var completedEmbed = new Discord.MessageEmbed()
							.setTitle("User Kicked!")
							.addField(msg.author.tag, "Successfully kicked " + user.user.tag)
							.setColor("00ff00")
							.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
						msg.channel.send(completedEmbed);
					};
				};
			};
			break;
		case "ban":
			if (msg.guild === null) return;
			if (!msg.member.permissions.toArray().includes("BAN_MEMBERS")) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Insufficient Permissions!")
					.addField(msg.author.tag, "You must have BAN_MEMBERS to use this command!")
					.setColor("ff0000")
					.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
				msg.channel.send(errorEmbed);
			} else {
				if (!args[2]) {
					var errorEmbed = new Discord.MessageEmbed()
						.setTitle("Insufficient Parameters!")
						.addField(msg.author.tag, "You must tag 1 user, and add a reason! (reason can be however long)")
						.setColor("ff0000")
						.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
					msg.channel.send(errorEmbed);
				} else {
					var user = msg.mentions.members.first()
					if (!user || user.bannable == false) {
						var errorEmbed = new Discord.MessageEmbed()
							.setTitle("Insufficient Parameters!")
							.addField(msg.author.tag, "You must tag 1 user, and add a reason! (reason can be however long)\nThis may have also been an error, if you are sure you tagged the user correctly, retry.")
							.setColor("ff0000")
							.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
						msg.channel.send(errorEmbed);
					} else {
						var serverName = msg.guild.name
						var admin = msg.author.tag
						var banreason = args.slice(2).join(" ");
						var bannedEmbed = new Discord.MessageEmbed()
							.setTitle(serverName)
							.addField("Banned!", "You have been banned from " + serverName + " by " + admin + " for " + banreason)
							.setColor("ff0000")
							.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
						user.user.send(bannedEmbed);
						setTimeout(function() {
							user.ban({
								days: 7,
								reason: "Banned by" + admin + " | " + banreason
							})
						}, 3000);
						var completedEmbed = new Discord.MessageEmbed()
							.setTitle("User Banned!")
							.addField(msg.author.tag, "Successfully banned " + user.user.tag)
							.setColor("00ff00")
							.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
						msg.channel.send(completedEmbed);
					};
				};
			};
			break;
		case "mute":
			if (msg.guild === null) return;
			var role = msg.guild.roles.cache.find(role => role.name === 'Muted')
			if (!role) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Command Error!")
					.addField(msg.author.tag, "Could not find role with name \"Muted\"\nPlease create a role if there is not one, or name your muted role \"Muted\"")
					.setColor("ff0000")
					.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
				msg.channel.send(errorEmbed);
			} else {
				if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
					var errorEmbed = new Discord.MessageEmbed()
						.setTitle("Insufficient Permissions!")
						.addField(msg.author.tag, "You must have MANAGE_MESSAGES to use this command!")
						.setColor("ff0000")
						.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
					msg.channel.send(errorEmbed);
				} else {
					var usertomute = msg.mentions.users.first()
					msg.guild.members.fetch(usertomute.id)
						.then(member => {
							if (!member || member.hasPermission("ADMINISTRATOR")) {
								var errorEmbed = new Discord.MessageEmbed()
									.setTitle("Insufficient Permissions!")
									.addField(msg.author.tag, "The user you tried to mute has ADMINISTRATOR permissions or could not find user!")
									.setColor("ff0000")
									.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
								msg.channel.send(errorEmbed);
							} else {
								member.roles.add(role, "Muted by " + msg.author.tag)
								var completedEmbed = new Discord.MessageEmbed()
									.setTitle("Muted User!")
									.addField(msg.author.tag, "Successfully muted " + usertomute.tag)
									.setColor("00ff00")
									.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
								msg.channel.send(completedEmbed);
							};
						});
				};
			};
			break;
		case "unmute":
			if (msg.guild === null) return;
			var role = msg.guild.roles.cache.find(role => role.name === 'Muted')
			if (!role) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Command Error!")
					.addField(msg.author.tag, "Could not find role with name \"Muted\"\nPlease create a role if there is not one, or name your muted role \"Muted\"")
					.setColor("ff0000")
					.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
				msg.channel.send(errorEmbed);
			} else {
				if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
					var errorEmbed = new Discord.MessageEmbed()
						.setTitle("Insufficient Permissions!")
						.addField(msg.author.tag, "You must have MANAGE_MESSAGES to use this command!")
						.setColor("ff0000")
						.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
					msg.channel.send(errorEmbed);
				} else {
					var usertomute = msg.mentions.users.first()
					msg.guild.members.fetch(usertomute.id)
						.then(member => {
							if (!member) {
								var errorEmbed = new Discord.MessageEmbed()
									.setTitle("Insufficient Perameters!")
									.addField(msg.author.tag, "The user you tried to unmute could not be found!")
									.setColor("ff0000")
									.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
								msg.channel.send(errorEmbed);
							} else {
								member.roles.remove(role, "Unmuted by " + msg.author.tag)
								var completedEmbed = new Discord.MessageEmbed()
									.setTitle("Unmuted User!")
									.addField(msg.author.tag, "Successfully unmuted " + usertomute.tag)
									.setColor("00ff00")
									.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
								msg.channel.send(completedEmbed);
							};
						});
				};
			};
			break;
		case "translatetq":
			if (!args[1]) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Insufficient Parameters!")
					.addField(msg.author.tag, "You must include a string to translate!")
					.setColor("ff0000")
					.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
				msg.channel.send(errorEmbed);
			} else {
				msg.channel.startTyping();
				var arrayts = args.join(" ");
				var msgtsn = arrayts.replace("translatetq ", "");
				var msgts = tqdecoder.decodeTQ(msgtsn)
				msg.channel.stopTyping(true);
				msg.channel.send('Translated version: ' + msgts + "\nTranslation may not be correct with intentional numbers.");
			};
			break;
		case "staff":
			var responseEmbed = new Discord.MessageEmbed()
				.setTitle("Bot Staff")
				.addField("Owner / Main Developer", "juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
				.addField("GitHub Contributors", "roux#0493")
				.setColor("00ff00")
				.setFooter("Made with ❤ by juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
			msg.channel.send(responseEmbed);
			break;
		case "uptime":
				var uptime = Math.floor(bot.uptime / 60000)
				if (uptime > 60) {
					uptime = Math.floor(uptime / 60) + " hours"
				} else {
					uptime = Math.floor(uptime) + " minutes"
				};
				msg.channel.send('Current bot uptime is ' + uptime)
				break;
		//OWNER ONLY COMMANDS
		case "echo":
			if (msg.author.id == "287704540810182657") {
				msg.channel.send(args.join(" ").replace("echo ", ""))
				msg.delete();
			} else {
				msg.delete();
			}
			break;
		case "eval":
			if (msg.author.id == "287704540810182657") {
				try {
					const code = args.join(" ");
					let evaled = eval(code);

					if (typeof evaled !== "string") {
						evaled = require("util").inspect(evaled);
					}

					msg.channel.send(evaled, {
						code: "x1"
					})
				} catch (err) {
					msg.channel.send('you messed it up, idiot\n' + err)
				}
			} else {
				msg.channel.send('nice try idiot')
			}
			break;
		case "shutdown":
			if (msg.author.id == "287704540810182657") {
				msg.channel.send('Shutting down...');
				setTimeout(function() {
					bot.destroy();
				},3000);
				bot.destroy();
			};
			break;
		case "setstatus":
			if (msg.author.id == "287704540810182657") {
				if (args[1] == "default") {
					status = "bot.user.setActivity('for ;help in ' + bot.guilds.cache.size + ' servers!', {\ntype: 'WATCHING'\n});"
					msg.channel.send('Set status to default message.\nThe bot may take 30 seconds to update status')
				} else {
					args.shift()
					status = "bot.user.setActivity('" + args.join(" ") + "', {\ntype: 'PLAYING'\n})"
					msg.channel.send('Set status to ' + args.join(" ") + "\nThe bot may take 30 seconds to update status")
				};
			} else {
				msg.channel.send('nice try idiot')
			};
			break;
		case "listservers":
			if (msg.author.id == "287704540810182657") {
				var string = ""
				bot.guilds.cache.forEach(server => {
					string = string + server.name + "\n"
				});
				msg.author.send(string)
			};
		};
	};
});

bot.login(process.env.token);