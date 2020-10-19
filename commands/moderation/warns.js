const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member);
    if (!db.get(`warnings.${message.guild.id}.${member.id}`)) db.set(`warnings.${message.guild.id}.${member.id}`, 0);
    let warningsEmbed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL())
        .addField("Warns", db.get(`warnings.${message.guild.id}.${member.id}`))
        .setTimestamp();
    return message.channel.send(warningsEmbed);
};
module.exports.help = {
    Name: "Warns",
    Aliases: ["warns", "warnings"],
    Category: "Moderation",
    Permissions: ["None"],
    Usage: ["Warns <member>"],
    Description: "Shows the warns of a member."
};