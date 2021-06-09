const discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
exports.run = async (client, message, args) => {
    let embed = new discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("BLURPLE").setTimestamp();
  let para = db.fetch(`Coins_${message.author.id}`);

  let timeout = 10000;

  let crime = await db.fetch(`bahisoynama1_${message.author.id}`);

  if (crime !== null && timeout - (Date.now() - crime) > 0) {
    let time = ms(timeout - (Date.now() - crime));
    return send(
      `:stopwatch: **| Lütfen __${
        time.seconds}__ saniye sonra tekrar dene!**`
    );
  } else {
    var miktar = args[0];
    if (!miktar)
      return send(
        `:x: **| Lütfen bahis oynamak için bir değer girin!**`
      );
    if (miktar > 50)
      return send(
        `:x: **| En fazla 50 coin bahis oynayabilirsin!**`
      );
    if (para == 0) 
      return send(
        `:x: **| Faqir fuqaranın burda işi yok, okeyy!?**`
      );
    

    if (para < 1) 
      return send(
        `:x: **| Faqir fuqaranın burda işi yok, okeyy!?**`
      );
    
    
      if (miktar > para) {
      return send(
        `:x: **| Faqir fuqaranın burda işi yok, okeyy!?**`
      );
    }
    const result = ["WINWIN", "LOOSELOOSE"];
    let awnser = result[Math.floor(Math.random() * result.length)];
    if (awnser === "LOOSELOOSE") {
      var kaybettin = miktar;
      send(`:question: **| ${miktar}** :coin: döndürüyor... <a:donuyo:846099055104753684>`).then((x) => { setTimeout(function() { x.edit(embed.setDescription(`:no_entry_sign: **| ${miktar}** :coin: döndürüyor... <:nah:852215993111281705> ve kaybetti **-${kaybettin}** :coin:`)) }, 3000)});
      await db.set(`bahisoynama1_${message.author.id}`, Date.now());
      await db.subtract(`Coins_${message.author.id}`, kaybettin);
    } else {
      var kazandın = miktar * 2;
      send(`:question: **| ${miktar}** :coin: döndürüyor... <a:donuyo:846099055104753684>`).then((x) => { setTimeout(function() { x.edit(embed.setDescription(`:handshake: **| ${miktar}** :coin: döndürüyor... <:nah:852215993111281705> ve kazandı **+${kazandın}** :coin:`)) }, 3000)});
      await db.set(`bahisoynama1_${message.author.id}`, Date.now());
      await db.add(`Coins_${message.author.id}`, kazandın);
    };
  };
  function send(text) {
    return message.channel.send(embed.setDescription(text));
  };
};

exports.help = { name: "cf", aliases: [] };