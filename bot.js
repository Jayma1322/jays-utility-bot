const Discord = require('discord.js');
const bot = new Discord.Client();

var blacklistedids = ["",""]

bot.on('ready', () => {
	bot.user.setActivity('for ;help!', {
		type: 'WATCHING'
	});
	console.log('bot up and running :D');
	setInterval(function(){
		bot.user.setActivity('for ;help in ' + bot.guilds.size + ' servers!', {
			type: 'WATCHING'
		});
}, 30000);
});

var blacklistedEmbed = new Discord.MessageEmbed()
.setTitle("Error!")
	.addField("Blacklisted!", "You have been blacklisted by the bot creator!")
	.setColor("ff0000")
	.setFooter("Made with ❤ by Jayma1322")

bot.on('message', msg => {
	var msgl = msg.content.toLowerCase();
	if (msgl.includes('daddy') || msgl.includes('dady') || msgl.includes('mommy') || msgl.includes('mummy') || msgl.includes('suck my dick')) {
		msg.react('😫');
		console.log('Reacted with to message by ' + msg.author.tag + '. Message contents: ' + msg.content);
	};
	if (msg.author.equals(bot.user)) return;

	if (!msg.content.startsWith(";")) return;

	if (msg.guild === null) return;

	if (blacklistedids.includes(msg.author.id)) {
		msg.channel.send(blacklistedEmbed);
	} else {

		var args = msg.content.substring(1).split(" ");
		var cmd = args[0].toLowerCase();

		if (cmd == "help") {
			var helpEmbedDM = new Discord.MessageEmbed()
				.setTitle("So, you need help with this garbage bot?")
				.addField("Info", "help - Lists all commands.\nstaff - Lists staff / contributors of the bot.")
				.addField("Moderation", "purge <amount> - Deletes the amount of messages you specify\nkick <mention> <reason> - Kicks the user you tag with the specified reason.\nban <mention> <reason> - Bans the user you tag with the specified reason.")
				.addField("Useful", ";translatetq <string> - Translates typing quirks for those who cannot read them.")
				.setColor("00ff00")
				.setFooter("Made with ❤ by Jayma1322")
			msg.channel.send("Check your DMs, " + "<@" + msg.author.id + ">");
			msg.author.send(helpEmbedDM);
		};
		if (cmd == "echo") {
			if (msg.author.id == "287704540810182657") {
				var arrayts = args.join(" ");
				var msgts = arrayts.replace("echo ", "");
				msg.channel.send(msgts);
				msg.delete();
			} else {
				msg.delete();
			}
		};
		if (cmd == "purge") {
			if (!args[1] || args[1] > 100) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Insufficient Parameters!")
					.addField(msg.author.tag, "You must include how many messages to delete! (limit 100)")
					.setColor("ff0000")
					.setFooter("Made with ❤ by Jayma1322")
				msg.channel.send(errorEmbed);
			} else {
				if (!msg.member.permissions.toArray().includes("MANAGE_MESSAGES")) {
					var errorEmbed = new Discord.MessageEmbed()
						.setTitle("Insufficient Permissions!")
						.addField(msg.author.tag, "You must have MANAGE_MESSAGES to use this command!")
						.setColor("ff0000")
						.setFooter("Made with ❤ by Jayma1322")
					msg.channel.send(errorEmbed);
				} else {
					msg.delete();
					msg.channel.bulkDelete(args[1]);
					var completedEmbed = new Discord.MessageEmbed()
						.setTitle("Messages Purged!")
						.addField(msg.author.tag, "Successfully purged " + args[1] + " messages!")
						.setColor("00ff00")
						.setFooter("Made with ❤ by Jayma1322")
					msg.channel.send(completedEmbed);
				};
			};
		};
		if (cmd == "kick") {
			if (!msg.member.permissions.toArray().includes("KICK_MEMBERS")) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Insufficient Permissions!")
					.addField(msg.author.tag, "You must have KICK_MEMBERS to use this command!")
					.setColor("ff0000")
					.setFooter("Made with ❤ by Jayma1322")
				msg.channel.send(errorEmbed);
			} else {
				if (!args[2]) {
					var errorEmbed = new Discord.MessageEmbed()
						.setTitle("Insufficient Parameters!")
						.addField(msg.author.tag, "You must tag 1 user, and add a reason! (reason can be however long)")
						.setColor("ff0000")
						.setFooter("Made with ❤ by Jayma1322")
					msg.channel.send(errorEmbed);
				} else {
					var user = msg.mentions.members.first()
					if (!user || user.kickable == false) {
						var errorEmbed = new Discord.MessageEmbed()
							.setTitle("Insufficient Parameters!")
							.addField(msg.author.tag, "You must tag 1 user, and add a reason! (reason can be however long)\nThis may have also been an error, if you are sure you tagged the user correctly, retry.")
							.setColor("ff0000")
							.setFooter("Made with ❤ by Jayma1322")
						msg.channel.send(errorEmbed);
					} else {
						var serverName = msg.guild.name
						var admin = msg.author.tag
						var kickreason = args.slice(2).join(" ");
						var kickedEmbed = new Discord.MessageEmbed()
							.setTitle(serverName)
							.addField("Kicked!", "You have been kicked from " + serverName + " by " + admin + " for " + kickreason)
							.setColor("ff0000")
							.setFooter("Made with ❤ by Jayma1322")
						user.user.send(kickedEmbed)
							.catch(() => msg.channel.send('Failed to DM user kicked message.'));
						user.kick(kickreason);
						var completedEmbed = new Discord.MessageEmbed()
							.setTitle("User Kicked!")
							.addField(msg.author.tag, "Successfully kicked " + user.user.tag)
							.setColor("00ff00")
							.setFooter("Made with ❤ by Jayma1322")
						msg.channel.send(completedEmbed);
					};
				};
			};
		};
		if (cmd == "ban") {
			if (!msg.member.permissions.toArray().includes("BAN_MEMBERS")) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Insufficient Permissions!")
					.addField(msg.author.tag, "You must have BAN_MEMBERS to use this command!")
					.setColor("ff0000")
					.setFooter("Made with ❤ by Jayma1322")
				msg.channel.send(errorEmbed);
			} else {
				if (!args[2]) {
					var errorEmbed = new Discord.MessageEmbed()
						.setTitle("Insufficient Parameters!")
						.addField(msg.author.tag, "You must tag 1 user, and add a reason! (reason can be however long)")
						.setColor("ff0000")
						.setFooter("Made with ❤ by Jayma1322")
					msg.channel.send(errorEmbed);
				} else {
					var user = msg.mentions.members.first()
					if (!user || user.bannable == false) {
						var errorEmbed = new Discord.MessageEmbed()
							.setTitle("Insufficient Parameters!")
							.addField(msg.author.tag, "You must tag 1 user, and add a reason! (reason can be however long)\nThis may have also been an error, if you are sure you tagged the user correctly, retry.")
							.setColor("ff0000")
							.setFooter("Made with ❤ by Jayma1322")
						msg.channel.send(errorEmbed);
					} else {
						var serverName = msg.guild.name
						var admin = msg.author.tag
						var banreason = args.slice(2).join(" ");
						var bannedEmbed = new Discord.MessageEmbed()
							.setTitle(serverName)
							.addField("Banned!", "You have been banned from " + serverName + " by " + admin + " for " + banreason)
							.setColor("ff0000")
							.setFooter("Made with ❤ by Jayma1322")
						user.user.send(bannedEmbed);
						setTimeout(function() {
							user.ban({
								days: 7,
								reason: banreason
							})
						}, 3000);
						var completedEmbed = new Discord.MessageEmbed()
							.setTitle("User Banned!")
							.addField(msg.author.tag, "Successfully banned " + user.user.tag)
							.setColor("00ff00")
							.setFooter("Made with ❤ by Jayma1322")
						msg.channel.send(completedEmbed);
					};
				};
			};
		};
		if (cmd == "translatetq") {
			if (!args[1]) {
				var errorEmbed = new Discord.MessageEmbed()
					.setTitle("Insufficient Parameters!")
					.addField(msg.author.tag, "You must include a string to translate!")
					.setColor("ff0000")
					.setFooter("Made with ❤ by Jayma1322")
				msg.channel.send(errorEmbed);
			} else {
				msg.channel.startTyping();
				var arrayts = args.join(" ");
				var msgtsn = arrayts.replace("translatetq ", "");
				var msgts = msgtsn.replace(/0/g, "o").replace(/1/g, "i").replace(/2/g, "s").replace(/3/g, "e").replace(/4/g, "a").replace(/5/g, "a").replace(/6/g, "g").replace(/7/g, "l").replace(/8/g, "B").replace(/9/g, "g").replace(/\$/g, "s")
				msg.channel.stopTyping(true);
				msg.channel.send('Translated version: ' + msgts + "\nTranslation may not be correct with intentional numbers.");
			};
		}
		if (cmd == "staff") {
			var responseEmbed = new Discord.MessageEmbed()
				.setTitle("Bot Staff")
				.addField("Owner", "juisdhiweuhrgiowuerhgiwUHIUOHWEO#0428")
				.addField("TranslationTQ Contributors", "ellie#0212\nbig_manc#6597")
				.setColor("00ff00")
				.setFooter("Made with ❤ by Jayma1322")
			msg.channel.send(responseEmbed);
		}
		if (cmd == "restart") {
			if (msg.author.id == "287704540810182657") {
				msg.channel.send('Restarting...');
				bot.destroy();
			};
		};
	};
});

bot.login("ODA5NDUyMzcwNTUwNDU2Mzg2.YCVTRA.3hEHA6Qt1Y9Sa7ZgKOYYSax8zVU");
