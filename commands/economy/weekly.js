const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let timeout = 604800000; // 168 Hours (1 Week) in ms
    let weeklycooldown = await db.fetch(`user.${message.author.id}.weeklycooldown`);
    if (weeklycooldown !== null && timeout - (Date.now() - weeklycooldown) > 0) {
        let time = ms(timeout - (Date.now() - weeklycooldown));
        return message.channel.send(`You're still on cooldown! Try again in **${time.days} day(s)** and **${time.hours} hour(s)**`);
    }
    let earnedMoney = 5000;
    await db.set(`user.${message.author.id}.weeklycooldown`, Date.now());
    await db.add(`money_${message.author.id}`, earnedMoney);
    const succesfullyWorked = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setDescription(`You received your weekly check of ${earnedMoney}${db.get(`guild.${message.guild.id}.currency`)}`)
        .addField("Your Balance", `${db.get(`money_${message.author.id}`)}${db.get(`guild.${message.guild.id}.currency`)}`)
        .setTimestamp();
    return message.channel.send(succesfullyWorked);
};
module.exports.help = {
    Name: "Weekly",
    Aliases: ["weekly"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["weekly"],
    Description: "Gives you money."
};