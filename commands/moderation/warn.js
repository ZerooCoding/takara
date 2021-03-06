const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have enough permission...");
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention any member...");
    if (!db.get(`warnings.${message.guild.id}.${member.id}`)) db.set(`warnings.${message.guild.id}.${member.id}`, 0);
    await db.add(`warnings.${message.guild.id}.${member.id}`, 1);
    return message.channel.send(`Succesfully warned ${member}\nWarnings: ${db.get(`warnings.${message.guild.id}.${member.id}`)}`);
};
module.exports.help = {
    Name: "Warn",
    Aliases: ["warn"],
    Category: "Moderation",
    Permissions: ["KICK_MEMBERS"],
    Usage: ["warn [member]"],
    Description: "Warns a member."
};