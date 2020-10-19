const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have enough permission...");
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention any member...");
    if (!db.get(`warnings.${message.guild.id}.${member.id}`)) db.set(`warnings.${message.guild.id}.${member.id}`, 0);
    if (db.get(`warnings.${message.guild.id}.${member.id}`) <= 0) return message.channel.send("Member doesn't have any warns to remove...");
    await db.subtract(`warnings.${message.guild.id}.${member.id}`, 1);
    return message.channel.send(`Succesfully removed a warning of ${member}\nWarnings: ${db.get(`warnings.${message.guild.id}.${member.id}`)}`);
};
module.exports.help = {
    Name: "Remove Warn",
    Aliases: ["removewarn", "rmw", "unwarn"],
    Category: "Moderation",
    Permissions: ["KICK_MEMBERS"],
    Usage: ["removewarn [member]"],
    Description: "Removes a warn."
};