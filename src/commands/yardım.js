const Discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
.setColor('BLURPLE')
.setTitle(client.user.username+" yardım")
.setFooter(client.user.username, client.user.displayAvatarURL({dynamic :true}))
.setThumbnail(message.guild.iconURL({dynamic:true}))
.addField(`\`?gö\``, "**Günlük ödülünü alırsın!**")
.addField(`\`?promosyon\``, "**Promosyon kodu kullanırsın veya bilgisine bakarsın!**")
.addField(`\`?top\``, "**En çok coine sahip kullanıcıları görürsün!**")
.addField(`\`?partner\``, "** Sunucunuzdaki partner ayarlarını yaparsın!**")
.addField(`\`?davet\``, "**Botu sunucuna davet edersin!**")
.addField(`\`?istatistik\``, "**Bot istatistiğini görürsün!**")
.addField("`?partner-bul`", "**Partner sunucular ararsın!**")
.addField("`?ayarlar`","**Sunucu partner ayarlarına bakarsın!**")
.addField(`\`?kb\``, "**Kullanıcı bilgisini görürsün!**")
.addField(`\`?cf\``, "**Para yatırıp kumar oynarsın!**")
message.channel.send(embed)
};
exports.help = { name: "yardım", aliases: ["y", "help", "info"] };