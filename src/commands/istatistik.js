const Discord = require("discord.js");
const data = require('quick.db');
const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  let toplam_partner = data.get("toplam_partner").length;
  let uptime = moment
        .duration(client.uptime)
        .format("D [gün], H [saat], m [dakika], s [saniye]");
let ghostpartner = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic :true}))
.setThumbnail(message.guild.iconURL({dynamic:true}))
.setColor('BLURPLE')
.setDescription(":hourglass: **Lütfen bekleyin, veriler alınıyor.**")
.setFooter(client.user.username, client.user.displayAvatarURL({dynamic :true}))
const ghostpartner1 = new Discord.MessageEmbed()
.setAuthor(client.user.username+' istatistiği')
.setThumbnail(message.guild.iconURL({dynamic:true}))
.addField('Aktiflik', uptime)
.addField('Bellek Kullanımı', `${(process.memoryUsage().heapUsed /1024 / 1024).toFixed(2)} mb`)
.addField('Sunucu Sayısı', client.guilds.cache.size.toLocaleString())
.addField('Kullanıcı Sayısı', client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString())
.addField("🤝 Toplam Yapılan Partnerlik", toplam_partner || 0)
.setColor('BLURPLE')
.setFooter(client.user.username, client.user.displayAvatarURL({dynamic :true})) 
message.channel.send(ghostpartner).then((mse) => { setTimeout(function() { mse.edit(ghostpartner1)  }, 3000)});
};

exports.help = { name: "istatistik",aliases:["i"]}