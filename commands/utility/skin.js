const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.channel.send("You didn't input any minecraft name...");
    const bust = new Discord.MessageEmbed()
        .setImage(`https://minotar.net/skin/${args[0]}`);
    message.channel.send({ embed: bust });
};
module.exports.help = {
    Name: "Skin",
    Aliases: ["skin"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["skin [minecraft name]"],
    Description: "Generates an image of a Minecraft skin."
};