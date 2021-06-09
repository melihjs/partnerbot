const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
exports.run = async (client, message) => {
  function rastgeleMiktar(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  let times = await db.fetch(`odul_${message.author.id}`);
  let day = 86400000;
  if (times !== null && day - (Date.now() - times) > 0) {
    let time = ms(day - (Date.now() - times));
    message.channel.send(
      new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("BLURPLE").setTimestamp()
        .setDescription(
          `⏱ Günlük ödülünü almak için **${
            time.hours}** saat, **${time.minutes}** dakika, **${
            time.seconds}** saniye sonra komutu tekrar dene!`
        )
    );
    return;
  }
  let moneys = rastgeleMiktar(1, 15);
  message.channel.send(
    new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("BLURPLE").setTimestamp()
      .setDescription(
        `Günlük ödülünü topladın, cüzdanına ${moneys} :coin: eklendi!`
      )
  );

  db.set(`odul_${message.author.id}`, Date.now());

  db.add(`Coins_${message.author.id}`, moneys);
};


exports.help = { name: "günlük-ödül",aliases:["gö"]}