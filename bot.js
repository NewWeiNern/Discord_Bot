const Discord = require('discord.js');
const client = new Discord.Client();
let current_id;
client.on('ready', () => {
    console.log("Bot is ready for deploy!");
    setInterval(()=>{
        var a = new XMLHttpRequest(),
            latestId = "https://www.rockstargames.com/newswire/tags.json?tags=702&page=1",
            cors = "https://cors-anywhere.herokuapp.com/",
            JSON_data = (e)=>"https://www.rockstargames.com/newswire/get-article/${id}.json?autoplay=false".replace("${id}", e);
        a.open("GET", cors+latestId);
        a.send();
        
        a.onreadystatechange = function(e){
            if(this.status == 200 && this.readyState == 4){
                console.log(JSON.parse(e.response).posts[0].id);
                if(!current_id){
                    current_id = JSON.parse(e.response).posts[0].id;
                }
                else{
                    if(current_id == JSON.parse(e.response).posts[0].id){return;}
                    else{current_id = JSON.parse(e.response).posts[0].id;}
                }
                let d = JSON_data(JSON.parse(e.response).posts[0].id),
                    b = new XMLHttpRequest(),
                    b.open("GET", cors+d);
                    b.send();
                    b.onreadystatechange = function(e){
                        if(this.status == 200 && this.readyState == 4){
                            console.log(JSON.parse(this.response).article.content);   
                        }
                    }
                }
            };
        
        }, 60000);
    });

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
