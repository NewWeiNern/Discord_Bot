const Discord = require('discord.js');
const client = new Discord.Client();
let date = 1;

client.on('ready', () => {
    console.log('I am ready!');
    setInterval(()=>{
        date+=1;
    }, 10000);
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
