const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("I wasn't able to find any member...");
    if (member.user.bot) return message.channel.send("This member is a bot...");
    if (!db.get(`money_${member.id}`)) db.set(`money_${member.id}`, 0);
    if (!Number(args[1])) return message.channel.send("You didn't input a valid number...");
    if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
    if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
    if (db.get(`money_${message.author.id}`) < args[1]) return message.channel.send("You don't have that much money...");
    await db.subtract(`money_${message.author.id}`, args[1]);
    await db.add(`money_${member.id}`, args[1]);
    const moneyPaid = new Discord.MessageEmbed()
        .setDescription(`${message.author} you've paid ${member} ${args[1]}${db.get(`guild.${message.guild.id}.currency`)}`)
        .addField(`Your Balance`, `${db.get(`money_${message.author.id}`)}${db.get(`guild.${message.guild.id}.currency`)}`)
        .addField(`${member.user.username}'s Balance`, `${db.get(`money_${member.id}`)}${db.get(`guild.${message.guild.id}.currency`)}`)
        .setTimestamp();
    return message.channel.send(moneyPaid);
};
module.exports.help = {
    Name: "Pay",
    Aliases: ["pay"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["pay [member] [money]"],
    Description: "Gives someone money."
};