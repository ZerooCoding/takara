const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member);
    let neededXP = 500;

    const levelInformation = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
        .addField("Level", db.get(`level_${member.id}.level`))
        .addField("XP", db.get(`level_${member.id}.xp`))
        .setFooter(`XP until next Level: ${neededXP - db.get(`level_${member.id}.xp`)}`)
        .setTimestamp();
    return message.channel.send(levelInformation);
};
module.exports.help = {
    Name: "Rank",
    Aliases: ["rank"],
    Category: "Level",
    Permissions: ["None"],
    Usage: ["rank <@member>"],
    Description: "Shows your current Level and amount of XP."
};