const Discord = require('discord.js'),
      request = require("request");
const client = new Discord.Client();
let current_id;
client.on('ready', () => {
    console.log("Bot is ready for deploy!");
    request("https://cors-anywhere.herokuapp.com/"+"https://www.rockstargames.com/newswire/tags.json?tags=702&page=1");
    });

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
