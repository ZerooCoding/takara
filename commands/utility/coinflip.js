const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    let sides = ["head", "number"];
    let index = Math.floor(Math.random() * sides.length);
    const coinFlipped = new Discord.MessageEmbed()
        .setDescription("The coin landed on " + sides[index])
        .setTimestamp();
    return message.channel.send(coinFlipped);
};
module.exports.help = {
    Name: "Coinflip",
    Aliases: ["coinflip", "coin", "flip", "flipcoin"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["coinflip"],
    Description: "Flips a coin for you."
};