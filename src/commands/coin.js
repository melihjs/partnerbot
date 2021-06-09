const discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  let embed = new discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("BLURPLE").setTimestamp();
  if(message.author.id !="760421959556792320" && message.author.id !="696407272145813505" && message.author.id !="397381858859548672") return send("\:x: **Hata! Sen bunu yapamazsın.**");
  let arg = args[0];
  if(!arg) return send("\:x: **Hata! Lütfen bir seçenek girin. (`ekle`, `sil`)**");
  if(arg == "ekle") {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
    if(!user) return send("\:x: **Lütfen bir kullanıcı girin.**");
    let miktar = args[2];
    if(!miktar) return send("\:x: **Lütfen bir değer girin.**");
    if(!isNaN(miktar))
    if(miktar) {
      data.add(`Coins_${user.id}`, miktar);
      return send("\:white_check_mark: **`"+user.tag+"` adlı kullanıcının cüzdanına `"+miktar+"` :coin: eklendi.**");
    };
  } else if(arg == "sil") {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
    if(!user) return send("\:x: **Lütfen bir kullanıcı girin.**");
    let miktar = args[2];
    if(!miktar) return send("\:x: **Lütfen bir değer girin.**");
    if(miktar) {
      data.subtract(`Coins_${user.id}`, miktar);
      return send("\:white_check_mark: **`"+user.tag+"` adlı kullanıcının cüzdanından `"+miktar+"` :coin: silindi.**");
    };
  };

  function send(text) {
    return message.channel.send(embed.setDescription(text));
  };
};

exports.help = { name:"coin", aliases:[] };
