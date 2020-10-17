const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!db.get(`user.${message.author.id}.items.pickaxe`)) db.set(`user.${message.author.id}.items.pickaxe`, 0);
    if (!db.get(`user.${message.author.id}.items.waste`)) db.set(`user.${message.author.id}.items.waste`, 0);
    if (!db.get(`user.${message.author.id}.items.stone`)) db.set(`user.${message.author.id}.items.stone`, 0);
    if (!db.get(`user.${message.author.id}.items.iron`)) db.set(`user.${message.author.id}.items.iron`, 0);
    if (!db.get(`user.${message.author.id}.items.diamond`)) db.set(`user.${message.author.id}.items.diamond`, 0);
    if (db.get(`user.${message.author.id}.items.pickaxe`) === 0) return message.channel.send("You don't have a pickaxe! You can buy it at the shop...");
    let timeout = 3600000; // 1 Hour in ms
    let minecooldown = await db.fetch(`user.${message.author.id}.minecooldown`);
    if (minecooldown !== null && timeout - (Date.now() - minecooldown) > 0) {
        let time = ms(timeout - (Date.now() - minecooldown));
        return message.channel.send(`You're still on cooldown! Try again in **${time.minutes} minute(s)** and **${time.seconds} second(s)**`)
    }
    await db.set(`user.${message.author.id}.minecooldown`, Date.now());
    let events = ["broken_pickaxe", "broken_pickaxe", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "iron", "iron", "iron", "diamond"];
    let index = Math.floor(Math.random() * events.length);
    if (events[index] === "broken_pickaxe") {
        db.subtract(`user.${message.author.id}.items.pickaxe`, 1);
        const pickBroke = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Your pickaxe broke... You should get a new one at the store!")
            .setTimestamp();
        return message.channel.send(pickBroke);
    }
    if (events[index] === "stone") {
        let newStone = Math.floor(Math.random() * 10) + 5; // Least 5 | Max 15
        await db.add(`user.${message.author.id}.items.stone`, newStone);
        const minedStone = new Discord.MessageEmbed()
            .setDescription(`You mined and received ${newStone} stones`)
            .addField("Current Amount Of Stone", db.get(`user.${message.author.id}.items.stone`))
            .setTimestamp();
        return message.channel.send(minedStone);
    }
    if (events[index] === "iron") {
        let newIron = Math.floor(Math.random() * 4) + 2;
        await db.add(`user.${message.author.id}.items.iron`, newIron);
        const minedIron = new Discord.MessageEmbed()
            .setDescription(`You mined and received ${newIron} iron ores`)
            .addField("Current Amount Of Iron", db.get(`user.${message.author.id}.items.iron`))
            .setTimestamp();
        return message.channel.send(minedIron);
    }
    if (events[index] === "diamond") {
        let newDiamond = 1;
        await db.add(`user.${message.author.id}.items.diamond`, newDiamond);
        const minedDiamond = new Discord.MessageEmbed()
            .setDescription(`You mined and received ${newDiamond} diamond`)
            .addField("Current Amount of Diamonds", db.get(`user.${message.author.id}.items.diamond`))
            .setTimestamp();
        return message.channel.send(minedDiamond);
    }
};
module.exports.help = {
    Name: "Mine",
    Aliases: ["mine"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["mine"],
    Description: "Gives you ores or waste."
};