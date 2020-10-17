const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.channel.send("You didn't input any minecraft name...");
    const bust = new Discord.MessageEmbed()
        .setImage(`http://cravatar.eu/helmavatar/${args[0]}/600.png`);
    message.channel.send({ embed: bust });
};
module.exports.help = {
    Name: "Face",
    Aliases: ["face"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["face [minecraft name]"],
    Description: "Generates an image of the face of a Minecraft skin."
};