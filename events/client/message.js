const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
module.exports = async (Client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!db.get(`guild.${message.guild.id}.prefix`)) db.set(`guild.${message.guild.id}.prefix`, config.DEFAULT_PREFIX);
    if (!db.get(`guild.${message.guild.id}.music`)) db.set(`guild.${message.guild.id}.music`, false);
    if (!message.content.startsWith(db.get(`guild.${message.guild.id}.prefix`))) return;
    if (!db.get(`user.${message.author.id}.rank`)) db.set(`user.${message.author.id}.rank`, "user");
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
    command.run(Client, message, args);
    console.log(`${message.author.tag}(${message.author.id}): ${command.help.Name} + ${args.join(" ") || "no arguments"}`);
};