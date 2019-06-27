const Discord = require('discord.js'),
      XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client();
const affect_only = "gta-news";

var Bothandler = {
    cors : {
        cors_anywhere : "https://cors-anywhere.herokuapp.com/",
        requestJSON(url){
            var xml = new XMLHttpRequest();
            xml.open("GET", this.cors_anywhere + url)
            xml.setRequestHeader("x-requested-with", "XMLHttpRequest");
            xml.send();
            return new Promise(x=>{
                xml.onreadystatechange = function(e){
                    if(this.readyState == 4 && this.status == 200 && this.responseText.length > 1)
                        x(this.responseText);
                }                
            });
            
        }
    },
    gta_newswire : "https://www.rockstargames.com/newswire/tags.json?tags=702&page=1",
    gta_related : "https://www.rockstargames.com/newswire/get-article/{id}.json?autoplay=false",
    init(){
        const regex = /<p.+><img.+|<div.+|<\/?.+?>/gm;
        
        client.on("message", message=>{
            if(message.content == "news" && affect_only == message.channel.name){
                if(!this.data_sent){
                    var get_id = (x)=>JSON.parse(x).posts[0].id,
                    get_content = x=>JSON.parse(x).article.content.replace(regex, ""),
                    get_related_content = (data)=>{
                        this.id = get_id(data);
                        return this.cors.requestJSON(this.gta_related.replace("{id}", get_id(data)));
                    }
                    this.cors.requestJSON(this.gta_newswire).then(get_related_content).then((e)=>{
                        this.data_sent = true;
                        setTimeout(()=>{this.data_sent = false}, 1800000);
                        this.time_until = Date.now() + 1800000;
                        message.channel.send(get_content(e).slice(0,2000));
                        message.channel.send(get_content(e).slice(2000, get_content(e).length);
                    });
                }
                else{
                    message.channel.send("Please wait until " + (this.time_until - Date.now()) / 1000 / 60 + " minutes");
                }
            }
        });
    }
};

Bothandler.init();
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
