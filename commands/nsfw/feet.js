const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.feetGif().then(feetGif => {
        let feetEmbed = new Discord.MessageEmbed()
            .setImage(feetGif.url)
            .setTimestamp();
        return message.channel.send(feetEmbed);
    });
}
module.exports.help = {
    Name: "Feet",
    Aliases: ["feet"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["feet"],
    Description: "Shows feet images/GIF."
};