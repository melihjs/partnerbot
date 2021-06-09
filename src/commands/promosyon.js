const { MessageEmbed } = require('discord.js');

module.exports.help = {
  name: "promosyon",
  aliases: ["promo", "promo-code"],
}

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("BLURPLE").setTimestamp();
    let arg = args[0];
    if(!arg) return send(':x: **| Lütfen bir seçenek belirtin.\n(`kullan`, `bilgi`)**');
      if(arg == "kullan") {
        let promo = client.data.fetch('promo_kod');
        let oluşturan = client.data.fetch('promo_olusturan');;
        let miktar = client.data.fetch('promo_miktar');
        let kullanım = client.data.fetch('promo_kullanim');
        if(!promo) {
          return send(':x: **| Geçerli bir promosyon kodu bulunamadı.**');
        } else {
          let arg = args[1];
          if(!arg) return send(':x: **| Lütfen geçerli bir kod belirtin.**');
          let kullanim = client.data.fetch('kullanim');
          let kullanan = client.data.fetch(`kullanan_${message.author.id}`);
            if(promo == arg) {
              let kullanim = client.data.fetch('kullanim');
              let kullanan = client.data.fetch(`kullanan_${message.author.id}`);
              if(kullanim == kullanım) return send(':x: **| Bu kodun kullanım ömrü tükenmiş.**');
              if(kullanan == 'evet') return send(':x: **| Sen bu kodu zaten kullanmışsın.**');
              client.data.add(`Coins_${message.author.id}`, miktar);
              client.data.set(`kullanan_${message.author.id}`, 'evet');
              return send(':handshake: **| Girmiş olduğun promosyon kodunu başarıyla kullandın.**');
            } else {
            return send(':x: **| Girmiş olduğun kod yanlış.**');
          }
        }
      } else if(arg == "bilgi") {
        let kod = args[1];
        let promo = client.data.fetch('promo_kod');
        if(!promo) {
          return send(':x: **| Geçerli bir promosyon kodu bulunamadı.**');
        } else {
          if(!kod) return send(':x: **| Lütfen geçerli bir kod belirtin.**');
          if(promo == kod) {
            return send(`\n:question: **Kodu Oluşturan**: <@${client.data.fetch('promo_olusturan')}>\n:question: **Kod Kullanım Ömrü**: ${client.data.fetch('promo_kullanim')}\n:question: **Kod Miktarı**: ${client.data.fetch('promo_miktar')}`)
          } else {
            return send(':x: **| Girmiş olduğun kod yanlış.**');
          }
        }
      } else if(arg == "kod-oluştur") {
        if(message.author.id !=="760421959556792320" && message.author.id !== "696407272145813505") return;
        let pr = args[1];
        let pr2 = args[2];
        let pr3 = args[3];
        if(!pr) return send(':x: **| Lütfen oluşturacağın kodun adını yaz.**');
        if(!pr2) return send(':x: **| Lütfen oluşturacağın kodun kullanım ömrünü yaz.**');
        if(!pr3) return send(':x: **| Lütfen oluşturacağın kodun vereceği para miktarını yaz.**');
        client.data.set('promo_kod', pr);
        client.data.set('promo_miktar', pr3);
        client.data.set('promo_olusturan', message.author.id);
        client.data.set('promo_kullanim', pr2);
        return send(':handshake: **| Girmiş olduğun bilgilere göre promosyon kodu oluşturuldu.**');
      } else if(arg == "kod-sil") {
        if(message.author.id !=="760421959556792320" && message.author.id !== "696407272145813505") return;
        let pr = args[1];
        let kod = client.data.fetch('promo_kod');
        if(!pr) return send(':x: **| Lütfen sileceğin kodun adını yaz.**');
        if(kod == pr) {
          client.data.delete('promo_kod');
          client.data.delete('promo_miktar');
          client.data.delete('promo_olusturan');
          client.data.delete('promo_kullanim');
          client.users.cache.forEach(user => {
            client.data.delete(`kullanan_${user.id}`)
          });
          return send(':handshake: **| Girmiş olduğun kod silindi.**')
        } else {
          return send(':x: **| Girmiş olduğun kod yanlış.**');
        }
      }
    function send(text) {
      return message.channel.send(embed.setDescription(text));
    }
}