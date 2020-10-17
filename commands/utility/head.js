const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.channel.send("You didn't input any minecraft name...");
    const bust = new Discord.MessageEmbed()
        .setImage(`https://cravatar.eu/helmhead/${args[0]}/600.png`);
    message.channel.send({ embed: bust });
};
module.exports.help = {
    Name: "Head",
    Aliases: ["head"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["head [minecraft name]"],
    Description: "Generates an image of the 3d head of a Minecraft skin."
};