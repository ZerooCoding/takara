const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member);
    
    const moneyInformation = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
        .addField("Your Balance", `${db.get(`money_${member.id}`)}${db.get(`guild.${message.guild.id}.currency`)}`)
        .setTimestamp();
    return message.channel.send(moneyInformation);
};
module.exports.help = {
    Name: "Balance",
    Aliases: ["balance", "bal", "money", "mon"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["balance <@member>"],
    Description: "Shows your current balance."
};