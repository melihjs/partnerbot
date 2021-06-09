const discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {

const ghost = new discord.MessageEmbed()
.setColor('BLURPLE')
 .setAuthor(`${message.author.tag}`, message.author.avatarURL({dynamic: true}))
.setDescription(`> Selam ${message.author}, **${client.guilds.cache.array().length}** sunucuda bulunuyorum.\n\n> Görünüşe göre botu beğendin ve sunucuna davet edeceksin.\n\n> \`!yardım\` yazarak komutlara detaylı bakabilirsin.`)
.addField(`<:kanal:827122010894762024> Bot Davet`, `[Davet et!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`, true)
.addField(`Destek Sunucusu`, `[Destek sunucusu](https://discord.gg/KMJCshWX4D)`, true)
.setThumbnail(client.user.displayAvatarURL())
.setFooter(client.user.username, client.user.displayAvatarURL())
message.channel.send(ghost)
};

exports.help = { name: "davet", aliases: [ "invite" ]};