const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    let sides = ["1", "2", "3", "4", "5", "6", "7"];
    let index = Math.floor(Math.random() * sides.length);
    const diceLanded = new Discord.MessageEmbed()
        .setDescription("The dice landed on " + sides[index])
        .setTimestamp();
    const diceFell = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Oh no! The dice fell down off table... Try again!")
        .setTimestamp();
    if (sides[index] === "7") return message.channel.send(diceFell);
        else message.channel.send(diceLanded);
};
module.exports.help = {
    Name: "Dice",
    Aliases: ["dice"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["dice"],
    Description: "Random number between 1 and 6"
};