const Discord = require('discord.js'),
      XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client();
const affect_channel = "gta-news";
var news_run = false;
function doCORSRequest(options, result){
    let cors = "https://cors-anywhere.herokuapp.com/";
    var xml = new XMLHttpRequest();
    xml.open(options.method, cors + options.url);
    xml.setRequestHeader("x-requested-with", "XMLHttpRequest");

    xml.onreadystatechange = function(e){
        if(this.readyState == 4 && this.status == 200 && this.responseText.length > 1)
            result(this.responseText);
    }
    xml.send();
}

client.on('message', message => {
    const regex = /<p.+><img.+|<div.+|<\/?.+?>/gm;

    if(message.content == "news" && affect_channel == message.channel.name && !news_run){
        doCORSRequest({method:"GET", url:"https://www.rockstargames.com/newswire/tags.json?tags=702&page=1"}, e=>{
            var id = JSON.parse(e).posts[0].id;
            doCORSRequest({method:"GET", url:"https://www.rockstargames.com/newswire/get-article/" + id + ".json?autoplay=false"}, e=>{
                message.channel.send(JSON.parse(e).article.content.replace(regex, ""));
                news_run = true;
                setTimeout(3600000, ()=>{news_run = false})
            });
            
        });
    }
    else{
         message.channel.send("News already posted!");
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
