const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!db.get(`user.${message.author.id}.items.rod`)) db.set(`user.${message.author.id}.items.rod`, 0);
    if (!db.get(`user.${message.author.id}.items.waste`)) db.set(`user.${message.author.id}.items.waste`, 0);
    if (!db.get(`user.${message.author.id}.items.fish`)) db.set(`user.${message.author.id}.items.fish`, 0);
    if (db.get(`user.${message.author.id}.items.rod`) === 0) return message.channel.send("You don't have a fishing rod! You can buy it at the shop...");
    let timeout = 3600000; // 1 Hour in ms
    let fishcooldown = await db.fetch(`user.${message.author.id}.fishcooldown`);
    if (fishcooldown !== null && timeout - (Date.now() - fishcooldown) > 0) {
        let time = ms(timeout - (Date.now() - fishcooldown));
        return message.channel.send(`You're still on cooldown! Try again in **${time.minutes} minute(s)** and **${time.seconds} second(s)**`)
    }
    await db.set(`user.${message.author.id}.fishcooldown`, Date.now());
    let events = ["broken_rod", "fish", "fish", "fish", "fish", "fish", "waste", "waste", "waste"];
    let index = Math.floor(Math.random() * events.length);
    if (events[index] === "broken_rod") {
        db.subtract(`user.${message.author.id}.items.rod`, 1);
        const rodBroke = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Your fishing rod broke... You should get a new one at the store!")
            .setTimestamp();
        return message.channel.send(rodBroke);
    }
    if (events[index] === "fish") {
        let newFish = Math.floor(Math.random() * 4) + 1; // Least 1 | Max 5
        await db.add(`user.${message.author.id}.items.fish`, newFish);
        const fishedFish = new Discord.MessageEmbed()
            .setDescription(`You fished and received ${newFish} fish`)
            .addField("Current Amount Of Fish", db.get(`user.${message.author.id}.items.fish`))
            .setTimestamp();
        return message.channel.send(fishedFish);
    }
    if (events[index] === "waste") {
        let newWaste = Math.floor(Math.random() * 2) + 1;
        await db.add(`user.${message.author.id}.items.waste`, newWaste);
        const fishedWaste = new Discord.MessageEmbed()
            .setDescription(`You fished but found ${newWaste} waste`)
            .addField("Current Amount Of Waste", db.get(`user.${message.author.id}.items.waste`))
            .setTimestamp();
        return message.channel.send(fishedWaste);
    }
};
module.exports.help = {
    Name: "Fish",
    Aliases: ["fish"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["fish"],
    Description: "Gives you fish or waste."
};