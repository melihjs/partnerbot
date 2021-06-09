const { MessageEmbed } = require('discord.js');

module.exports.run = function(client, message, args) {
      const Teyit = client.data.all().filter(data => data.ID.startsWith(`Coins_`)).sort((a, b) => b.data - a.data)
        Teyit.length = 10
        let FinalDB = ""
        for (var i in Teyit) {
          FinalDB += `**${Teyit.indexOf(Teyit[i])+1}. ${client.users.cache.get(Teyit[i].ID.slice(6)).tag}** - **${Teyit[i].data}** Coin!\n`
        }
        
        const Revenge = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("BLURPLE").setTimestamp()
        .addField('En çok coine sahip kullanıcılar', FinalDB.replace('undefined','UNKNOWN USER#0000') || 'Veri Yok.')
        message.channel.send(Revenge)
};

module.exports.help = { name: "top", aliases: [] };