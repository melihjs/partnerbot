const Discord = require("discord.js");
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let embed2 = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("BLURPLE").setTimestamp();
if (!db.fetch(`partner_${message.guild.id}.sorumlu`)) return message.channel.send(embed2.setDescription("\:x: **| Sunucuda Partner Sorumlusu ayarlı değil.\n\n`?partner sorumlusu @Partner Sorumlusu`**")).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`partner_${message.guild.id}.log`)) return message.channel.send(embed2.setDescription("\:x: **| Sunucuda Partner Log Kanalı ayarlı değil.\n\n`?partner log ayarla #kanal`**")).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`partner_${message.guild.id}.text`)) return message.channel.send(embed2.setDescription("\:x: **| Sunucuda Partner Texti ayarlı değil.\n\n`?partner text ayarla <text>`**")).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`partner_${message.guild.id}.sistem`)) return message.channel.send(embed2.setDescription("\:x: **| Sunucuda sistem aktif değil.\n\n`?partner aç`**")).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`partner_${message.guild.id}.kanal`)) return message.channel.send(embed2.setDescription("\:x: **| Sunucuda Partner Kanalı ayarlı değil.\n\n`?partner kanal ayarla #kanal`**")).then(Hata => Hata.delete({timeout:45000}))
let role = db.fetch(`partner_${message.guild.id}.sorumlu`)
if (!message.member.roles.cache.has(role)) return message.channel.send(embed2.setDescription(`:x: **| Bu komutu kullanabilmek için \`${message.guild.roles.cache.get(role).name}\` rolüne sahip olmalısın.**`)).then(Hata => Hata.delete({timeout:15000})) 
        const Arr = []
        let i0 = 0;
        let i1 = 5;
        let page = 1;

        let guilds = client.guilds.cache.array();
        guilds.forEach((a) => guilds = [...guilds]);

        let description = guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
        .map((r, i) => `\n**${r.name} ・ ${r.memberCount} üye**\n> Kurucusu: <@${r.ownerID}> \n> Son Partner Yapılma: **${moment(db.fetch(`partner_${Arr[page+i]}.son`)).startOf('minutes').fromNow().replace('Invalid date','Bilinmiyor')}**\n> URL: **${r.id}**`)
        .slice(0, 5)
        .join("\n");

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("BLURPLE")
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(message.guild.iconURL({dynamic:true}))
            .setDescription(description);

        let msg = await message.channel.send(embed);
        
        await msg.react("⬅");
        await msg.react("❌");
        await msg.react("➡");

        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on("collect", async(reaction, user) => {

            if(reaction._emoji.name === "⬅") {

                // Updates variables
                i0 = i0-5;
                i1 = i1-5;
                page = page-1;
                
                // if there is no guild to display, delete the message
                if(i0 < 0){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }
                
                description = guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `\n**${r.name} ・ ${r.memberCount} üye**\n> Kurucusu: <@${r.ownerID}> \n> Son Partner Yapılma: **${moment(db.fetch(`PartnerTopSaat_${Arr[page+i]}`)).startOf('minutes').fromNow().replace('Invalid date','Bilinmiyor')}**\n> URL: **${r.id}**`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setDescription(description);
            
                // Edit the message 
                msg.edit(embed);
            
            };

            if(reaction._emoji.name === "➡"){

                // Updates variables
                i0 = i0+5;
                i1 = i1+5;
                page = page+1;

                // if there is no guild to display, delete the message
                if(i1 > guilds.length + 5){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }

                description = guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `\n**${r.name} ・ ${r.memberCount} üye**\n> Kurucusu: <@${r.ownerID}> \n> Son Partner Yapılma: **${moment(db.fetch(`PartnerTopSaat_${Arr[page+i]}`)).startOf('minutes').fromNow().replace('Invalid date','Bilinmiyor')}**\n> URL: **${r.id}**`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setDescription(description);
            
                // Edit the message 
                msg.edit(embed);

            };

            if(reaction._emoji.name === "❌"){
                return msg.delete(); 
            }

            // Remove the reaction when the user react to the message
            await reaction.users.remove(message.author.id);

        });
    };
    exports.help = { name: "partner-bul", aliases: [] };