const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let timeout = 3600000; // 1 Hour in ms
    let workcooldown = await db.fetch(`user.${message.author.id}.workcooldown`);
    if (workcooldown !== null && timeout - (Date.now() - workcooldown) > 0) {
        let time = ms(timeout - (Date.now() - workcooldown));
        return message.channel.send(`You're still on cooldown! Try again in **${time.minutes} minute(s)** and **${time.seconds} second(s)**`)
    }
    let earnedMoney = Math.floor(Math.random() * 300) + 200; // Least: 200 | Max: 500
    await db.set(`user.${message.author.id}.workcooldown`, Date.now());
    await db.add(`money_${message.author.id}`, earnedMoney);
    const succesfullyWorked = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setDescription(`You worked and received ${earnedMoney}${db.get(`guild.${message.guild.id}.currency`)}`)
        .addField("Your Balance", `${db.get(`money_${message.author.id}`)}${db.get(`guild.${message.guild.id}.currency`)}`)
        .setTimestamp();
    return message.channel.send(succesfullyWorked);
};
module.exports.help = {
    Name: "Work",
    Aliases: ["work"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["work"],
    Description: "Gives you money for working."
};