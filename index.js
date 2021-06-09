const { Client, Collection, MessageEmbed } = require("discord.js");
const readFile = require("fs");
const data = require("quick.db");
const client = new Client();
require("./src/eventLoader.js")(client);
client.data = data;
client.logger = console;
client.commands = new Collection();
client.aliases = new Collection();

client.on('ready', () => {
  client.logger.log(`[GHOST PARTNER]: ${client.user.tag} ismiyle bağlandım!`);
  client.user.setPresence({
    activity: {
      name: "?yardım - "+client.guilds.cache.array().length+" sunucu!",
      type: "WATCHING"
    },
    status: "idle"
  });
  if (!Array.isArray(client.data.get("toplam_partner"))) {
    client.data.set("toplam_partner", []);
  } else if (!Array.isArray(client.data.get("promo_kod"))) {
    client.data.set("promo_kod", []);
  } else if (!Array.isArray(client.data.get("promo_miktar"))) {
    client.data.set("promo_miktar", []);
  } else if (!Array.isArray(client.data.get("promo_olusturan"))) {
    client.data.set("promo_olusturan", []);
  } else if (!Array.isArray(client.data.get("promo_kullanim"))) {
    client.data.set("promo_kullanim", []);
  }
});

readFile.readdir('./src/commands/', (err, files) => {
  if(err) client.logger.error(err);
  client.logger.log(`[GHOST PARTNER]: ${files.length} adet komut yüklenecek!`);
  files.forEach(file => {
    let komut = require(`./src/commands/${file}`);
    client.logger.log(`[GHOST PARTNER]: ${komut.help.name} adlı komut yüklendi!`);
    client.commands.set(komut.help.name, komut);
    komut.help.aliases.forEach(alias => {
      client.aliases.set(alias, komut.help.name);
    });
  });
});

client.login("").catch(error => { client.logger.error("[GHOST PARTNER]: Token yanlış!") })
