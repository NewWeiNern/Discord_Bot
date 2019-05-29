const Discord = require('discord.js'),
      XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client();
let current_id;
client.on('ready', () => {
      console.log("Bot is ready for deploy!");
      var xml = new XMLHttpRequest();
      xml.open("GET", "https://cors-anywhere.herokuapp.com/" + "https://www.rockstargames.com/newswire/tags.json?tags=702&page=1");
      xml.send();
      xml.onreadystatechange = function(e){
            console.log(e);
            if(this.status == 200 && this.readyState == 4){
                  console.log(e);
            }
      }
    });

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
