const Discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  let sistem = data.fetch(`partner_${message.guild.id}.sistem`);
  let sorumlu = data.fetch(`partner_${message.guild.id}.sorumlu`);
  let log = data.fetch(`partner_${message.guild.id}.log`);
  let kanal = data.fetch(`partner_${message.guild.id}.kanal`);
  let text = data.fetch(`partner_${message.guild.id}.text`);

  let acik;
  if(sistem) {
    acik = `\:white_check_mark: **| Evet**`
  } else {
    acik = "\:x: **| Hayır**"
  }

  let rol1;
  if(sorumlu) {
    rol1 = `\:white_check_mark: **| <@&${sorumlu}>**`
  } else {
    rol1 = "\:x: **| Ayarlanmamış**"
  }

  let tex;
  if(text) {
    tex = `\:white_check_mark: **| Ayarlanmış**`
  } else {
    tex = "\:x: **| Ayarlanmamış**"
  }

  let kana;
  if(kanal) {
    kana = `\:white_check_mark: **| <#${kanal}>**`
  } else {
    kana = "\:x: **| Ayarlanmamış**"
  }

  let lo;
  if(log) {
    lo = `\:white_check_mark: **| <#${log}>**`
  } else {
    lo = "\:x: **| Ayarlanmamış**"
  }


  return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setTimestamp().setColor("#5865f2").addField(":question: - Sistem açık mı?", acik).addField(":busts_in_silhouette: - Partner sorumlusu rolü", rol1).addField(":scroll: - Partner texti", tex).addField(":hash: - Partner kanalı", kana).addField(":orange_book: - Partner log kanalı", lo).addField(":link: - URL", "\:x: **| "+message.guild.id+"**"))
};

exports.help = { name:"ayarlar", aliases:[]};