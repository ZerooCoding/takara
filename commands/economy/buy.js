const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    const currency = db.get(`guild.${message.guild.id}.currency`);
    let rod_buy = 250;
    let pickaxe_buy = 250;
    let waste_buy = 8;
    let fish_buy = 10;
    let stone_buy = 10;
    let iron_buy = 20;
    let diamond_buy = 1500;
    let ring_buy = 150;
    if (!args[0]) return message.channel.send("You didn't mention any item to buy! You can see all items in the shop...");
    if (args[0].toLowerCase() === "rod" || args[0].toLowerCase() === "fishing_rod") {
        if (!args[1]) {
            if (db.get(`money_${message.author.id}`) < rod_buy) return message.channel.send("You don't have enough money...");
            db.subtract(`money_${message.author.id}`, rod_buy);
            db.add(`user.${message.author.id}.items.rod`, 1);
            return message.channel.send(`You bought 1 fishing rod for ${rod_buy}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to buy isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`money_${message.author.id}`) < (rod_buy * args[1])) return message.channel.send("You don't have enough money to buy this many...");
            db.subtract(`money_${message.author.id}`, (rod_buy * args[1]));
            db.add(`user.${message.author.id}.items.rod`, args[1]);
            return message.channel.send(`You bought ${args[1]} fishing rods for ${(rod_buy * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "pickaxe" || args[0].toLowerCase() === "pick") {
        if (!args[1]) {
            if (db.get(`money_${message.author.id}`) < pickaxe_buy) return message.channel.send("You don't have enough money...");
            db.subtract(`money_${message.author.id}`, pickaxe_buy);
            db.add(`user.${message.author.id}.items.pickaxe`, 1);
            return message.channel.send(`You bought 1 pickaxe for ${pickaxe_buy}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to buy isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`money_${message.author.id}`) < (pickaxe_buy * args[1])) return message.channel.send("You don't have enough money to buy this many...");
            db.subtract(`money_${message.author.id}`, (pickaxe_buy * args[1]));
            db.add(`user.${message.author.id}.items.pickaxe`, args[1]);
            return message.channel.send(`You bought ${args[1]} pickaxes for ${(pickaxe_buy * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "waste") {
        if (!args[1]) {
            if (db.get(`money_${message.author.id}`) < waste_buy) return message.channel.send("You don't have enough money...");
            db.subtract(`money_${message.author.id}`, waste_buy);
            db.add(`user.${message.author.id}.items.waste`, 1);
            return message.channel.send(`You bought 1 waste for ${waste_buy}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to buy isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`money_${message.author.id}`) < (waste_buy * args[1])) return message.channel.send("You don't have enough money to buy this many...");
            db.subtract(`money_${message.author.id}`, (waste_buy * args[1]));
            db.add(`user.${message.author.id}.items.waste`, args[1]);
            return message.channel.send(`You bought ${args[1]} waste for ${(waste_buy * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "fish") {
        if (!args[1]) {
            if (db.get(`money_${message.author.id}`) < fish_buy) return message.channel.send("You don't have enough money...");
            db.subtract(`money_${message.author.id}`, fish_buy);
            db.add(`user.${message.author.id}.items.fish`, 1);
            return message.channel.send(`You bought 1 fish for ${fish_buy}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to buy isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`money_${message.author.id}`) < (fish_buy * args[1])) return message.channel.send("You don't have enough money to buy this many...");
            db.subtract(`money_${message.author.id}`, (fish_buy * args[1]));
            db.add(`user.${message.author.id}.items.fish`, args[1]);
            return message.channel.send(`You bought ${args[1]} fish for ${(fish_buy * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "stone" || args[0].toLowerCase() === "rock") {
        if (!args[1]) {
            if (db.get(`money_${message.author.id}`) < stone_buy) return message.channel.send("You don't have enough money...");
            db.subtract(`money_${message.author.id}`, stone_buy);
            db.add(`user.${message.author.id}.items.stone`, 1);
            return message.channel.send(`You bought 1 stone for ${stone_buy}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to buy isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`money_${message.author.id}`) < (stone_buy * args[1])) return message.channel.send("You don't have enough money to buy this many...");
            db.subtract(`money_${message.author.id}`, (stone_buy * args[1]));
            db.add(`user.${message.author.id}.items.stone`, args[1]);
            return message.channel.send(`You bought ${args[1]} stones for ${(stone_buy * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "iron") {
        if (!args[1]) {
            if (db.get(`money_${message.author.id}`) < iron_buy) return message.channel.send("You don't have enough money...");
            db.subtract(`money_${message.author.id}`, iron_buy);
            db.add(`user.${message.author.id}.items.iron`, 1);
            return message.channel.send(`You bought 1 iron for ${iron_buy}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to buy isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`money_${message.author.id}`) < (iron_buy * args[1])) return message.channel.send("You don't have enough money to buy this many...");
            db.subtract(`money_${message.author.id}`, (iron_buy * args[1]));
            db.add(`user.${message.author.id}.items.iron`, args[1]);
            return message.channel.send(`You bought ${args[1]} iron for ${(iron_buy * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "diamond") {
        if (!args[1]) {
            if (db.get(`money_${message.author.id}`) < diamond_buy) return message.channel.send("You don't have enough money...");
            db.subtract(`money_${message.author.id}`, diamond_buy);
            db.add(`user.${message.author.id}.items.diamond`, 1);
            return message.channel.send(`You bought 1 diamond for ${diamond_buy}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to buy isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`money_${message.author.id}`) < (diamond_buy * args[1])) return message.channel.send("You don't have enough money to buy this many...");
            db.subtract(`money_${message.author.id}`, (diamond_buy * args[1]));
            db.add(`user.${message.author.id}.items.diamond`, args[1]);
            return message.channel.send(`You bought ${args[1]} diamonds for ${(diamond_buy * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "ring") {
        if (!args[1]) {
            if (db.get(`money_${message.author.id}`) < ring_buy) return message.channel.send("You don't have enough money...");
            db.subtract(`money_${message.author.id}`, ring_buy);
            db.add(`user.${message.author.id}.items.ring`, 1);
            return message.channel.send(`You bought 1 marriage ring for ${ring_buy}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to buy isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`money_${message.author.id}`) < (ring_buy * args[1])) return message.channel.send("You don't have enough money to buy this many...");
            db.subtract(`money_${message.author.id}`, (ring_buy * args[1]));
            db.add(`user.${message.author.id}.items.ring`, args[1]);
            return message.channel.send(`You bought ${args[1]} marriage rings for ${(ring_buy * args[1])}${currency}`);
        }
    }
};
module.exports.help = {
    Name: "Buy",
    Aliases: ["buy"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["buy"],
    Description: "Use to buy items from the shop."
};