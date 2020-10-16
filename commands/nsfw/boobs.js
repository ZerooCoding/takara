const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.boobs().then(boobsGIF => {
        let boobsEmbed = new Discord.MessageEmbed()
            .setImage(boobsGIF.url)
            .setTimestamp();
        return message.channel.send(boobsEmbed);
    });
}
module.exports.help = {
    Name: "Boobs",
    Aliases: ["boobs", "tits", "breasts"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["boobs"],
    Description: "Shows boobs images/GIF."
};