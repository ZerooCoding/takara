const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.anal().then(analGIF => {
        let analEmbed = new Discord.MessageEmbed()
            .setImage(analGIF.url)
            .setTimestamp();
        return message.channel.send(analEmbed);
    });
}
module.exports.help = {
    Name: "Anal",
    Aliases: ["anal", "ass"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["anal"],
    Description: "Shows an anal image/GIF."
};