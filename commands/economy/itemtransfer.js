const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention any member...");
    if (!args[1]) return message.channel.send("You didn't input any item you want to give...");
    if (args[1].toLowerCase() === "rod" || args[1].toLowerCase() === "fishing_rod") {
        if (db.get(`user.${message.author.id}.items.rod`) <= 0) return message.channel.send("You don't have enough items...");
        db.subtract(`user.${message.author.id}.items.rod`, 1)
        db.add(`user.${member.id}.items.rod`, 1);
        return message.channel.send(`You gave ${member} 1 fishing rod`);
    }
    if (args[1].toLowerCase() === "pickaxe" || args[1].toLowerCase() === "pick") {
        if (db.get(`user.${message.author.id}.items.pickaxe`) <= 0) return message.channel.send("You don't have enough items...");
        db.subtract(`user.${message.author.id}.items.pickaxe`, 1)
        db.add(`user.${member.id}.items.pickaxe`, 1);
        return message.channel.send(`You gave ${member} 1 pickaxe`);
    }
    if (args[1].toLowerCase() === "waste") {
        if (db.get(`user.${message.author.id}.items.waste`) <= 0) return message.channel.send("You don't have enough items...");
        db.subtract(`user.${message.author.id}.items.waste`, 1)
        db.add(`user.${member.id}.items.waste`, 1);
        return message.channel.send(`You gave ${member} 1 waste`);
    }
    if (args[1].toLowerCase() === "fish") {
        if (db.get(`user.${message.author.id}.items.fish`) <= 0) return message.channel.send("You don't have enough items...");
        db.subtract(`user.${message.author.id}.items.fish`, 1)
        db.add(`user.${member.id}.items.fish`, 1);
        return message.channel.send(`You gave ${member} 1 fish`);
    }
    if (args[1].toLowerCase() === "stone" || args[1].toLowerCase() === "rock") {
        if (db.get(`user.${message.author.id}.items.stone`) <= 0) return message.channel.send("You don't have enough items...");
        db.subtract(`user.${message.author.id}.items.stone`, 1)
        db.add(`user.${member.id}.items.stone`, 1);
        return message.channel.send(`You gave ${member} 1 stone`);
    }
    if (args[1].toLowerCase() === "iron") {
        if (db.get(`user.${message.author.id}.items.iron`) <= 0) return message.channel.send("You don't have enough items...");
        db.subtract(`user.${message.author.id}.items.iron`, 1)
        db.add(`user.${member.id}.items.iron`, 1);
        return message.channel.send(`You gave ${member} 1 iron`);
    }
    if (args[1].toLowerCase() === "diamond") {
        if (db.get(`user.${message.author.id}.items.diamond`) <= 0) return message.channel.send("You don't have enough items...");
        db.subtract(`user.${message.author.id}.items.diamond`, 1)
        db.add(`user.${member.id}.items.diamond`, 1);
        return message.channel.send(`You gave ${member} 1 diamond`);
    }
    if (args[1].toLowerCase() === "ring") {
        if (db.get(`user.${message.author.id}.items.ring`) <= 0) return message.channel.send("You don't have enough items...");
        db.subtract(`user.${message.author.id}.items.ring`, 1)
        db.add(`user.${member.id}.items.ring`, 1);
        return message.channel.send(`You gave ${member} 1 marriage ring`);
    }
};
module.exports.help = {
    Name: "Item-Transfer",
    Aliases: ["itemtransfer", "item-transfer", "it", "give", "gift"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["itemtransfer [member] [item]"],
    Description: "Give someone else an item."
};