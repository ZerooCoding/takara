const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
module.exports = async (Client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!db.get(`guild.${message.guild.id}.prefix`)) db.set(`guild.${message.guild.id}.prefix`, config.DEFAULT_PREFIX);
    if (!db.get(`guild.${message.guild.id}.fun`)) db.set(`guild.${message.guild.id}.fun`, false);
    if (!db.get(`guild.${message.guild.id}.nsfw`)) db.set(`guild.${message.guild.id}.nsfw`, false);
    if (!db.get(`guild.${message.guild.id}.music`)) db.set(`guild.${message.guild.id}.music`, false);
    if (!db.get(`guild.${message.guild.id}.level`)) db.set(`guild.${message.guild.id}.level`, false);
    if (!db.get(`guild.${message.guild.id}.utility`)) db.set(`guild.${message.guild.id}.utility`, false);
    if (!db.get(`guild.${message.guild.id}.economy`)) db.set(`guild.${message.guild.id}.economy`, false);
    if (!db.get(`guild.${message.guild.id}.moderation`)) db.set(`guild.${message.guild.id}.moderation`, false);
    if (!db.get(`guild.${message.guild.id}.currency`)) db.set(`guild.${message.guild.id}.currency`, config.DEFAULT_CURRENCY);
    if (!message.content.startsWith(db.get(`guild.${message.guild.id}.prefix`))) return;
    if (!db.get(`money_${message.author.id}`)) db.set(`money_${message.author.id}`, 0);
    if (!db.get(`user.${message.author.id}.banned`)) db.set(`user.${message.author.id}.banned`, false);
    const youreBanned = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription("You're banned!\nI'm sorry but you can't use this bot anymore.\nIf you think this is a false ban please visit the [support server](https://discord.gg/CuRS4bY).")
        .setTimestamp();
    if (db.get(`user.${message.author.id}.banned`) === true) return message.channel.send(youreBanned);
    const args = message.content.slice(db.get(`guild.${message.guild.id}.prefix`).length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command;
    if (Client.commands.has(cmd)) {
        command = Client.commands.get(cmd);
    } else {
        command = Client.commands.get(Client.aliases.get(cmd));
    }
    if (!command) return;
    if (command.help.Category === "Moderation" && db.get(`guild.${message.guild.id}.moderation`) === false) return message.channel.send("Moderation isn't activated on this guild.\nActivate it with the \`moderation\` command in the setup category.");
    if (command.help.Category === "Fun" && db.get(`guild.${message.guild.id}.fun`) === false) return message.channel.send("Fun isn't activated on this guild.\nActivate it with the \`fun\` command in the setup category.");
    if (command.help.Category === "NSFW" && db.get(`guild.${message.guild.id}.nsfw`) === false) return message.channel.send("NSFW isn't activated on this guild.\nActivate it with the \`nsfw\` command in the setup category.");
    if (command.help.Category === "Music" && db.get(`guild.${message.guild.id}.music`) === false) return message.channel.send("Music isn't activated on this guild.\nActivate it with the \`music\` command in the setup category.");
    if (command.help.Category === "Level" && db.get(`guild.${message.guild.id}.level`) === false) return message.channel.send("Level isn't activated on this guild.\nActivate it with the \`level\` command in the setup category.");
    if (command.help.Category === "Utility" && db.get(`guild.${message.guild.id}.utility`) === false) return message.channel.send("Utility isn't activated on this guild.\nActivate it with the \`utility\` command in the setup category.");
    if (command.help.Category === "Economy" && db.get(`guild.${message.guild.id}.economy`) === false) return message.channel.send("Economy isn't activated on this guild.\nActivate it with the \`economy\` command in the setup category.");
    command.run(Client, message, args);
    console.log(`${message.author.tag}(${message.author.id}): ${command.help.Name} + ${args.join(" ") || "no arguments"}`);
};