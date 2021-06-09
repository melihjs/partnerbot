const Discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  let coin = data.fetch(`Coins_${message.author.id}`);
  let embed = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("#5865f2").setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true}));
  return message.channel.send(embed.setTitle("Senin `"+coin+"` :coin: coinin var!"));
};

exports.help = { name: "bal", aliases: ["balance", "para", "coin"] };