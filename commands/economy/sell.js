const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    const currency = db.get(`guild.${message.guild.id}.currency`);
    let rod_sell = 100;
    let pickaxe_sell = 100;
    let waste_sell = 5;
    let fish_sell = 8;
    let stone_sell = 8;
    let iron_sell = 15;
    let diamond_sell = 1000;
    let ring_sell = 100;
    if (!args[0]) return message.channel.send("You didn't mention any item to sell! You can see all items in the shop...");
    if (args[0].toLowerCase() === "rod" || args[0].toLowerCase() === "fishing_rod") {
        if (!args[1]) {
            if (db.get(`user.${message.author.id}.items.rod`) === 0) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, rod_sell);
            db.subtract(`user.${message.author.id}.items.rod`, 1);
            return message.channel.send(`You sold 1 fishing rod for ${rod_sell}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to sell isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`user.${message.author.id}.items.rod`) < args[1]) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, (rod_sell * args[1]));
            db.subtract(`user.${message.author.id}.items.rod`, args[1]);
            return message.channel.send(`You sold ${args[1]} fishing rods for ${(rod_sell * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "pickaxe" || args[0].toLowerCase() === "pick") {
        if (!args[1]) {
            if (db.get(`user.${message.author.id}.items.pickaxe`) === 0) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, pickaxe_sell);
            db.subtract(`user.${message.author.id}.items.pickaxe`, 1);
            return message.channel.send(`You sold 1 pickaxe for ${pickaxe_sell}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to sell isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`user.${message.author.id}.items.pickaxe`) < args[1]) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, (pickaxe_sell * args[1]));
            db.subtract(`user.${message.author.id}.items.pickaxe`, args[1]);
            return message.channel.send(`You sold ${args[1]} pickaxes for ${(pickaxe_sell * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "waste") {
        if (!args[1]) {
            if (db.get(`user.${message.author.id}.items.waste`) === 0) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, waste_sell);
            db.subtract(`user.${message.author.id}.items.waste`, 1);
            return message.channel.send(`You sold 1 waste for ${waste_sell}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to sell isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`user.${message.author.id}.items.waste`) < args[1]) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, (waste_sell * args[1]));
            db.subtract(`user.${message.author.id}.items.waste`, args[1]);
            return message.channel.send(`You sold ${args[1]} waste for ${(waste_sell * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "fish") {
        if (!args[1]) {
            if (db.get(`user.${message.author.id}.items.fish`) === 0) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, fish_sell);
            db.subtract(`user.${message.author.id}.items.fish`, 1);
            return message.channel.send(`You sold 1 fish for ${fish_sell}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to sell isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`user.${message.author.id}.items.fish`) < args[1]) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, (fish_sell * args[1]));
            db.subtract(`user.${message.author.id}.items.fish`, args[1]);
            return message.channel.send(`You sold ${args[1]} fish for ${(fish_sell * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "stone" || args[0].toLowerCase() === "rock") {
        if (!args[1]) {
            if (db.get(`user.${message.author.id}.items.stone`) === 0) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, stone_sell);
            db.subtract(`user.${message.author.id}.items.stone`, 1);
            return message.channel.send(`You sold 1 stone for ${stone_sell}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to sell isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`user.${message.author.id}.items.stone`) < args[1]) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, (stone_sell * args[1]));
            db.subtract(`user.${message.author.id}.items.stone`, args[1]);
            return message.channel.send(`You sold ${args[1]} stones for ${(stone_sell * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "iron") {
        if (!args[1]) {
            if (db.get(`user.${message.author.id}.items.iron`) === 0) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, iron_sell);
            db.subtract(`user.${message.author.id}.items.iron`, 1);
            return message.channel.send(`You sold 1 iron for ${iron_sell}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to sell isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`user.${message.author.id}.items.iron`) < args[1]) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, (iron_sell * args[1]));
            db.subtract(`user.${message.author.id}.items.iron`, args[1]);
            return message.channel.send(`You sold ${args[1]} iron for ${(iron_sell * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "diamond") {
        if (!args[1]) {
            if (db.get(`user.${message.author.id}.items.diamond`) === 0) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, diamond_sell);
            db.subtract(`user.${message.author.id}.items.diamond`, 1);
            return message.channel.send(`You sold 1 diamond for ${iron_sell}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to sell isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`user.${message.author.id}.items.diamond`) < args[1]) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, (diamond_sell * args[1]));
            db.subtract(`user.${message.author.id}.items.diamond`, args[1]);
            return message.channel.send(`You sold ${args[1]} diamonds for ${(iron_sell * args[1])}${currency}`);
        }
    }
    if (args[0].toLowerCase() === "ring") {
        if (!args[1]) {
            if (db.get(`user.${message.author.id}.items.ring`) === 0) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, ring_sell);
            db.subtract(`user.${message.author.id}.items.ring`, 1);
            return message.channel.send(`You sold 1 marriage ring for ${ring_sell}${currency}`);
        } else if (args[1]) {
            if (!Number(args[1])) return message.channel.send("The amount of items you want to sell isn't valid...");
            if ((args[1] - Math.floor(args[1])) !== 0) return message.channel.send("The given number isn't valid...");
            if (args[1] <= 0) return message.channel.send("The given number isn't valid...");
            if (db.get(`user.${message.author.id}.items.ring`) < args[1]) return message.channel.send("You don't have enough items...");
            db.add(`money_${message.author.id}`, (ring_sell * args[1]));
            db.subtract(`user.${message.author.id}.items.ring`, args[1]);
            return message.channel.send(`You sold ${args[1]} mariage ring for ${(ring_sell * args[1])}${currency}`);
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