module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  let prefix = `<@!${client.user.id}>`;
  if (!message.content.startsWith(prefix)) return;
  let params = message.content.split(" ").slice(2);
  let command = message.content.split(" ")[1];
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } 
  if (cmd) {
    if(!message.guild) return;
    cmd.run(client, message, params);
  }
};
