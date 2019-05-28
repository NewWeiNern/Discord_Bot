const Discord = require('discord.js');
const client = new Discord.Client();
let current_id;
client.on('ready', () => {
    console.log("Bot is ready for deploy!");
    });

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
