// BlopBot V2.0.0
// Created by MolePatrol


//#region requirements
const Discord = require('discord.js');
const fs = require("fs");
const schedule = require('node-schedule');
const request = require('request');
var Filter = require('bad-words');
const sqlite3 = require('sqlite3').verbose();
//#endregion

//#region setting up bot
const { prefix, token } = require('./config.json'); // gets the prefix and the token from ./config.json
const client = new Discord.Client(); // creates new discord client instance

client.once('ready', () => { // turns on bot
    client.user.setPresence({
    status: "idle",  // You can show online, idle... Do not disturb is dnd
    game: {
        name: "catgirls",  // The message shown
        type: "WATCHING" // PLAYING, WATCHING, LISTENING, STREAMING,
    }
    });
	console.log('Ready'); // logs successful boot in console
	//#region joinvc
	const channel = client.channels.cache.get("544617423048015876");
	if (!channel) return console.error("The channel does not exist!");
	channel.join().then(connection => {
		// Yay, it worked!

		console.log("Successfully connected.");
	}).catch(e => {
		// Oh no, it errored! Let's log it to console :)
		console.error(e);
	});
	//#endregion
	
	client.guilds.cache.get('738434422524739587').me.voice.setSelfMute(true)
	client.guilds.cache.get('738434422524739587').me.voice.setSelfDeaf(true)
	
	
});
//#endregion


//#region welcome message
client.on('guildMemberAdd', member => { // on the member add event
	if (member.bot) return; // ignores if join member is a bot
	member.send("https://images-ext-1.discordapp.net/external/QnWLbIFPexhvIHytDPXJw9dcqkxsFpg0CNJMNNfDeg4/https/media1.tenor.com/images/421c343ebc238b4da81bcf3936eee073/tenor.gif");
	// send this message
});
//#endregion


//#region schedule


//var smp = schedule.scheduleJob('15 */6 * * *', function () { // at this time
//	client.channels.cache.get('751862099097026680').send("Join our SMP at blopmc.ml on Minecraft 1.16.4!\nFind info here: <#756874800529539122>")// send this message
//		.catch(console.error);// log any errors to console
//});
//#endregion


//#region blacklists
var suicidefilter = new Filter({ emptyList: true }); // create empty blacklist
suicidefilter.addWords('killmyself', 'offmyself', 'enditall', 'hangmyself', 'suicide'); // add these words
var filter = new Filter({ emptyList: true }); // create empty blacklist
filter.addWords('nigger', 'nigga', 'fag', 'faggot', 'tranny', 'trannie', 'retard', 'retarded'); // add these words
//#endregion


//#region requests
const requestfox = { // sets api variable
	url: 'https://some-random-api.ml/img/fox',
	methord: 'GET',
	headers: {
		'Accept': 'application/json',
		'Accept-Charset': 'utf-8'
	}
};

const requestredpanda = { // sets api variable
	url: 'https://some-random-api.ml/img/red_panda',
	methord: 'GET', // http get
	headers: { // in this format
		'Accept': 'application/json',
		'Accept-Charset': 'utf-8'
	}
};
const requestbirb = { // sets api variable
	url: 'https://some-random-api.ml/img/birb',
	methord: 'GET', // http get
	headers: { // in this format
		'Accept': 'application/json',
		'Accept-Charset': 'utf-8'
	}
};
const requestcat = { // sets api variable
	url: 'https://some-random-api.ml/img/cat',
	methord: 'GET', // http get
	headers: { // in this format
		'Accept': 'application/json',
		'Accept-Charset': 'utf-8'
	}
};
const requestjoke = { // sets api variable
	url: 'https://official-joke-api.appspot.com/random_joke',
	methord: 'GET', // http get
	headers: { // in this format
		'Accept': 'application/json',
		'Accept-Charset': 'utf-8'
	}
};
//#endregion


client.on('message', async message => {// on message sent event
	if (message.author.bot) return; // if message author is bot, ignore
	if (message.content.toLowerCase().includes('@everyone')) return;// if message contains @everyone, ignore
	if (message.content.toLowerCase().includes('@here')) return;// if message contains @here, ignore
	if (checkMention(message)) return;// if checkMention(message) is true, ignore
	userCheck(message); // checks user against database
	//#region execute blacklists
	
	
	
	// removed for now while only being used in molepatrol discord
/*	if (!(adminAuth(message) || prevAuth(message))) { // if user != admin or helper

		if (message.content.toLowerCase() !== suicidefilter.clean(message.content.toLowerCase())) { // if message != cleaned message
			message.member.send('hey, i noticed that your message might contain the words or phrases relating to suicide.\nif you need help then follow this link to get a list of suicide hotlines: https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines \nand remember that the staff of WSR are always here to help.');
			// send this message to user
			client.guilds.cache.find(guild => guild.id === '725832633019400315').channels.cache.find(ch => ch.id === '774358568551055390').send('<@' + message.author.id + '> has said a suicide related word. You might want to message them :D\nmessage: ' + message.content);
			// notify mods in this channel
		}
	}
	if (!modAuth(message) || !adminAuth(message)) {
		if (message.content.toLowerCase() !== filter.clean(message.content.toLowerCase())) {
			message.member.send("oops you said a bad word :o. If you think this is a mistake dm your message to a mod and they can send it for you :D \n\nmessage:  " + message.content);

			message.delete();
		}
	}
	//#endregion*/
//modAuth(message) || adminAuth(message)
	//#region mod/admin commands
	if (true) {
		if (!message.content.startsWith(prefix)) return; // if no prefix, ignore
		const input = message.content.slice(prefix.length).trim(); // set input
		if (!input.length) return; // if empty input, ignore
		const [, commandNameRaw, argsRaw] = input.match(/(\w+)\s*([\s\S]*)/); // creates arrays from regex
		const commandName = commandNameRaw.toLowerCase(); // set commandName
		const args = argsRaw.split(/\s+/); // set args


		//#region join vc
		if (commandName === 'joinvc') {
			const channel = client.channels.cache.get("544617423048015876"); // set channel to vc1
			if (!channel) return console.error("The channel does not exist!"); // if channel doesn't exist, log in console
			channel.join().then(connection => { // try to join vc
				// Yay, it worked!
				console.log("Successfully connected."); // if successful, log to console
			}).catch(e => {
				console.error(e); // if it errors, log to console
			});
		}
		if (commandName === 'leavevc') {
			const channel = client.channels.cache.get("544617423048015876"); // set channel to vc1
			if (!channel) return console.error("The channel does not exist!"); // if channel doesn't exist, log in console
			else channel.leave()
		}
		//#endregion


		//#region vc mutes
		if (commandName === 'mutevc') {
			const members = message.member.voice.channel.members; // get array of members in vc
			members.forEach(member => { // iterate over
				member.voice.setMute(true); // mute members
			});
			message.channel.send('Server muted'); // log in console
		} else if (commandName === 'unmutevc') {
			const members = message.member.voice.channel.members; // get array of members in vc
			members.forEach(member => { //iterate over
				member.voice.setMute(false); // mute members
			});
			message.channel.send('Server unmuted'); // log in console
		}
		//#endregion


		//#region say
		if (commandName === 'say') { // say in same channel
			try {

				if (message.attachments.size > 0) { // if has attachments
					await message.channel.send("__ __" + message.attachments.first().url) // send message and attachments
				}
				if (message.content !== "") { // if message not empty
					await message.channel.send(argsRaw) // send message
				}
				await message.delete() // delete message
			} catch (e) {
				console.log(e) // if error, log in console
			}
		}

		if (commandName === 'psay') { // say in mole main chat
			try {
				if (message.attachments.size > 0) { // if has attachments
					await client.guilds.cache.find(guild => guild.id === '544611037458989056').channels.cache.find(ch => ch.id === '544611037458989058').send("__ __" + message.attachments.first().url); // send message and attachments
				}
				if (message.content !== "") { // if message not empty
					await client.guilds.cache.find(guild => guild.id === '544611037458989056').channels.cache.find(ch => ch.id === '544611037458989058').send(argsRaw); // send message
				}
			} catch (e) {
				console.log(e) // if error, log in console
			}
		}

		if (commandName === 'dsay') { // say in chosen channel in wsr
			let messageArr = argsRaw.split(' | '); // split channel id from message
			let channelID = messageArr[0]; // channel id is first item in array
			let message1 = messageArr[1]; // message is second item in array
			try {
				if (message.attachments.size > 0) {// if has attachments
					await client.guilds.cache.find(guild => guild.id === '544611037458989056').channels.cache.find(ch => ch.id === channelID).send(" " + message.attachments.first().url);// send message and attachments
				}
				if (message.content !== "") {// if message not empty
					await client.guilds.cache.find(guild => guild.id === '544611037458989056').channels.cache.find(ch => ch.id === channelID).send(message1);// send message
				}
			} catch (e) {
				console.log(e)// if error, log in console
			}
		}
		//#endregion
		if(commandName === 'selfmute') message.guild.me.voice.setSelfMute(true)
		if(commandName === 'selfdeaf') message.guild.me.voice.setSelfDeaf(true)
		//#region chat mutes
		if (commandName === 'mute') {
			let user = message.guild.member(message.mentions.users.first());
			var role = message.guild.roles.cache.find(role => role.name === "Muted");
			user.roles.add(role);

		}
		if (commandName === 'unmute') {
			let user = message.guild.member(message.mentions.users.first());
			var role = message.guild.roles.cache.find(role => role.name === "Muted");
			user.roles.remove(role);
		}
		//#endregion
	}
	//#endregion
//modAuth(message) || adminAuth(message) || channelAuth(message)
	//#region user allowed commands
	if (true) {
		if (!message.content.startsWith(prefix)) return; // if no prefix, ignore
		const input = message.content.slice(prefix.length).trim(); // set input
		if (!input.length) return; // if empty input, ignore
		const [, commandNameRaw, argsRaw] = input.match(/(\w+)\s*([\s\S]*)/); // creates arrays from regex
		const commandName = commandNameRaw.toLowerCase(); // set commandName
		const args = argsRaw.split(/\s+/); // set args

		//#region user commands
		if (commandName === 'pog') {
			message.channel.send("drone kinda be pog tho")
		}
		if (commandName === 'j') {
			message.channel.send('https://tenor.com/view/letter-gif-9063754');
		}
		if (commandName === 'gingy') {
			message.channel.send('more than pog i think xxx')
		}
		if (commandName === 'smojoe') {
			message.channel.send('smoljoe')
		}
		if (commandName === 'smp') {
			message.channel.send("Join our SMP at blopmc.ml on Minecraft 1.16.4!");
		}
		if (commandName === 'duck') {
			message.channel.send('ducks go brrrrrrr')
		}
		if (commandName === 'time') {
			message.channel.send('revolution time');
		}
		if (commandName === 'hack') {
			msg = await message.channel.send('00001111001001010101\n1100111100110101011111\n0000111100100001110111');
			setTimeout(() => {
				// Edit msg 1 seconds later
				msg.edit('1100111100110101011111\n0000111100100001110111\n0000111100110101010101\n');
			}, 100);
			setTimeout(() => {
				// Edit msg 1 seconds later
				msg.edit('1100111100110101011111\n0000111100110101010101\n0000111100100001110111\n');
			}, 100);
			setTimeout(() => {
				// Edit msg 1 seconds later
				msg.edit('0000111100100101010001\n1100111100110101011111\n0000111100100001110111\n');
			}, 100);

			msg2 = await message.channel.send('hacking mainframe');
			setTimeout(() => {
				// Edit msg 1 seconds later
				msg.edit('-----------------------------\n            hacked\n-----------------------------');
			}, 100);
			setTimeout(() => {
				msg2.edit('hacked: you are now admin');
			}, 100);

		}
		if (commandName === 'bonk') {
			if (argsRaw.replace(/\s/g, '') === "") {// if args empty
				message.channel.send('bonked');
			}
			else if (argsRaw.includes(message.author.id)) {//if args = userid
				message.channel.send('congrats! you bonked yourself!');
			}
			else {
				message.channel.send(argsRaw + ' has been bonked');//if args != userid
			}
		}
		if (commandName === 'pat') {
			if (argsRaw.replace(/\s/g, '') === "") {// if args empty
				message.channel.send('*pat pat*');
			}
			else if (argsRaw.includes(message.author.id)) {//if args = userid
				message.channel.send('lmao! imagine being so void of love that you pat yourself');
			}
			else {
				message.channel.send("*pats " + argsRaw + '*');
			}
		}
		if (commandName === 'hug') {
			if (argsRaw.replace(/\s/g, '') === "") {// if args empty
				message.channel.send('*hugs*');
			}
			else if (argsRaw.includes(message.author.id)) {
				message.channel.send('good! everyone deserves self love');//if args = userid
			}
			else {
				message.channel.send("*hugs " + argsRaw + '*');//if args != userid
			}
		}
		if (commandName === 'ban') {
			if (argsRaw.replace(/\s/g, '') === "") {// if args empty
				message.channel.send('*bans*');
			}
			else if (argsRaw.includes(message.author.id)) {//if args = userid
				message.channel.send('you can\'t ban yourself you pleb');
			}
			else {
				message.channel.send(argsRaw + ' has been banned.');//if args != userid
			}
		}
		if (commandName === 'mole') {
			message.channel.send('*hot*');
		}
		if (commandName === 'oscar') {
			message.channel.send('his exact address is || nice try hobbiz ||');
		}
		if (commandName === 'warcrime') {
			message.channel.send('ever heard of mole\'s soup shop?');
		}
		if (commandName === 'tos') {
			message.channel.send(':red_circle: :blue_circle: :red_circle: :blue_circle: :red_circle: :blue_circle: :red_circle:\n_**YOU ARE UNDER ARREST**_\n**             CRIME**: *fetus*\n:red_circle: :blue_circle: :red_circle: :blue_circle: :red_circle: :blue_circle: :red_circle:');
		}
		//#endregion

		//#region api and stuff
		if (commandName === 'fox') {
			request(requestfox, function (err, res, body) { // request from api
				let json = JSON.parse(body);
				message.channel.send(json.link);
			});
		}
		if (commandName === `dadjoke`) {
			request(requestjoke, function (err, res, body) {
				let json = JSON.parse(body);
				message.channel.send(json.setup + "\n" + json.punchline);
			});
		}
		if (commandName === `redpanda`) {
			request(requestredpanda, function (err, res, body) {
				let json = JSON.parse(body);
				message.channel.send(json.link);
			});
		}
		if (commandName === `birb`) {
			request(requestbirb, function (err, res, body) {
				let json = JSON.parse(body);
				message.channel.send(json.link);
			});
		}
		if (commandName === `cat`) {
			request(requestcat, function (err, res, body) {
				let json = JSON.parse(body);
				message.channel.send(json.link);
			});
		}

		if (commandName === `whalefact`) {
			whalefact(message);// call whalefacts function
		}
	}
	//#endregion


});



/// hello any people looking at this
/// this is a feature im working on to make 
/// this bot actually useful outside of its origin server.
/*client.on("guildCreate", guild => {
	console.log("Joined a new guild: " + guild.name);
	initGuild(guild);
})

function initGuild(guild) {
	//#region mainfinder
	let mod, main, spam, pics
	if (guild.channels.cache.some(channel => channel.name === 'main')) main = client.channels.cache.get(channel => channel.name === 'main').id;
	else main = 1;
	//#endregion
	//#region modfinder
	if (guild.channels.cache.some(channel => channel.name === 'mod-chat')) mod = guild.channels.cache.some(channel => channel.name === 'mod-chat').id;
	else mod = 1;
	//#endregion
	//#region spamfinder
	if (guild.channels.cache.some(channel => channel.name === 'spam')) spam = guild.channels.cache.some(channel => channel.name === 'spam').id;
	else spam = 1;
	//#endregion
	//#region picsfinder
	if (guild.channels.cache.some(channel => channel.name === 'pics')) pics = guild.channels.cache.some(channel => channel.name === 'pics').id;
	else pics = 1;
	//#endregion
	let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => { // new sqlite instance
		if (err) {
			console.error(err.message); // log any errors to console
		}
	})
	db.run("INSERT INTO guilds (guildID, guildMain, guildMod, guildSpam, guildPics) VALUES ($guildID, $guildMain, $guildMod, $guildSpam, $guildPics)", { // runs insert sql 
		$guildID: guild,
		$guildMain: main,
		$guildMod: mod,
		$guildSpam: spam,
		$guildPics: pics,

	});

	db.close(); // disconnects from the database
}
*/
//#region auth
function adminAuth(message) {
	if (message.member.roles.cache.some(role => role.name === 'admin role') || message.member.roles.cache.some(role => role.name === 'This is how I role' || message.author.id === `365402174521475083`)) return true;
	// valid if has roles
}

function modAuth(message) {
	if (message.member.roles.cache.some(role => role.name === 'DJ') || message.member.roles.cache.some(role => role.name === 'everyone')) return true;
	// valid if has roles
}

function prevAuth(message) {
	if (message.member.roles.cache.some(role => role.name === 'Duck')) return true;
	// valid if has roles
}

function channelAuth(message) {
	if (message.channel.id === 544611037458989058 || message.channel.id === 545296004770037760) return true;
	// valid if in whitelisted channel 
}
//#endregion

//#region whalefacts
function whalefact(message) {
	fs.readFile("whalefacts.json", function (err, facts) { // read from whalefacts.json
		if (err) throw err;
		const whalefacts = JSON.parse(facts); // parse
		const parsedwhalefacts = whalefacts.facts; // parse more
		var randomwhalefacts = parsedwhalefacts[Math.floor(Math.random() * parsedwhalefacts.length)]; // get random fact
		message.channel.send(randomwhalefacts.fact); // send fact
	});
}
//#endregion

//#region checkMention  - this prevents people from @ing roles
function checkMention(message) {
	var mentionRole = /<@&!?(\d+)>/ // define regex
	if (mentionRole.test(message.content)) { // if something in the string matches
		return true;
	}
	else return false;
}
//#endregion

//#region regular role 
function userCheck(message) {
	let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => { // new sqlite instance
		if (err) {
			console.error(err.message); // logs any errors
		}
	})

	let sql = `SELECT userID id,
               amount amount
               FROM messages
               WHERE userID  = ?`; // defines sql 
	let userID = message.author.id; // stores user id
	// first row only
	db.get(sql, [userID], (err, row) => { // using the sql defined, with the user id as the data
		if (err) {
			return console.error(err.message);
		}
		return row
			? incrementUser(message, row.amount) // if user found then increment their count
			: addUser(message); // else add them to the db

	});

	db.close(); // disconnects from the database

}

function incrementUser(message, amount) {
	let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => { // new sqlite instance
		if (err) {
			console.error(err.message); // log any errors
		}
	})

	let data = [amount + 1, message.author.id]; // sets the data
	let sql = `UPDATE messages
                SET amount = ?
                WHERE userID = ?`; // defines the sql request

	db.run(sql, data, function (err) { // run the sql request with the data provided
		if (err) {
			return console.error(err.message);
		}

	});
	db.close(); // disconnects from the database

	checkMessage(message); // calls the check message function
}
function addUser(message) {
	let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => { // new sqlite instance
		if (err) {
			console.error(err.message); // log any errors to console
		}
	})
	db.run("INSERT INTO messages (userID, amount) VALUES ($userID, $amount)", { // runs insert sql 
		$userID: message.author.id, // users id
		$amount: 1, // default value of 1
	});

	db.close(); // disconnects from the database
}



function checkMessage(message) {
	if (message.member.roles.cache.some(role => role.name === 'Regular')) return; // if user already has regular role, 
	let RegularRole = message.guild.roles.cache.find(r => r.name === "Regular"); // sets RegularRole

	let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => { // new sqlite instance
		if (err) {
			console.error(err.message); // logs any errors to console
		}
	})

	let sql = `SELECT userID id,
                      amount amount
               FROM messages
               WHERE userID  = ?`; // defines sql query
	let userID = message.author.id;

	// first row only
	db.get(sql, [userID], (err, row) => {
		if (err) {
			return console.error(err.message);
		}
		if (row.amount > 10) {
			message.member.roles.add(RegularRole) // give regular role
		}
	});

	db.close();// disconnects from the database
}


//#endregion
client.login(token); // logs bot in
