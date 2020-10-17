const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let timeout = 86400000; // 24 Hours in ms
    let dailycooldown = await db.fetch(`user.${message.author.id}.dailycooldown`);
    if (dailycooldown !== null && timeout - (Date.now() - dailycooldown) > 0) {
        let time = ms(timeout - (Date.now() - dailycooldown));
        return message.channel.send(`You're still on cooldown! Try again in **${time.hours} hour(s)** and **${time.minutes} minute(s)**`)
    }
    let earnedMoney = 1000;
    await db.set(`user.${message.author.id}.dailycooldown`, Date.now());
    await db.add(`money_${message.author.id}`, earnedMoney);
    const succesfullyWorked = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setDescription(`You received your daily check of ${earnedMoney}${db.get(`guild.${message.guild.id}.currency`)}`)
        .addField("Your Balance", `${db.get(`money_${message.author.id}`)}${db.get(`guild.${message.guild.id}.currency`)}`)
        .setTimestamp();
    return message.channel.send(succesfullyWorked);
};
module.exports.help = {
    Name: "Daily",
    Aliases: ["daily"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["daily"],
    Description: "Gives you money."
};