const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.channel.send("You didn't input any minecraft name...");
    const bust = new Discord.MessageEmbed()
        .setImage(`https://minotar.net/armor/bust/${args[0]}/300.png`);
    message.channel.send({ embed: bust });
};
module.exports.help = {
    Name: "Bust",
    Aliases: ["bust"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["bust [minecraft name]"],
    Description: "Generates an image of the top half of a Minecraft skin."
};