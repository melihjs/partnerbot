const Discord = require("discord.js");
const moment = require("moment");
const client = new Discord.Client();
const db = require("quick.db");
require('moment-duration-format')

exports.run = async (bot, msg, args) => {
  let user = msg.mentions.users.first() || msg.author;
const Revenge = new Discord.MessageEmbed()
.setColor('BLURPLE')
.setAuthor(user.username,user.avatarURL({dynamic:true}))
.setThumbnail(message.guild.iconURL({dynamic:true}))
.addField('👤 Ad',user.tag,true)
.addField(`:coin: Coin`,db.fetch(`Coins_${user.id}`) || 0,true)
.addField('🎲 ID',user.id,true)
.addField('🏵️ Durumu',user.presence.status.replace('dnd', 'Rahatsız Etmeyin').replace('idle', 'Boşta').replace('offline', 'Çevrimdışı').replace('online', 'Çevrimiçi'),true)
.addField('📅 Hesabın oluşturulduğu tarih',moment(user.createdAt).format('DD MMMM YYYY').replace('January', 'Ocak').replace('February', 'Şubat').replace('March', 'Mart').replace('April', 'Nisan').replace('May', 'Mayıs').replace('June', 'Haziran').replace('July', 'Temmuz').replace('August', 'Ağustos').replace('September', 'Eylül').replace('October', 'Ekim').replace('November', 'Kasım').replace('December', 'Aralık'),true)
msg.channel.send(Revenge)
};

    exports.help = { name: "kb", aliases: ["kullanıcı-bilgi"] };