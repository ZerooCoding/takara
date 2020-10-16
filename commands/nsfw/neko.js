const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.neko().then(neko => {
        let nekoEmbed = new Discord.MessageEmbed()
            .setImage(neko.url)
            .setTimestamp();
        return message.channel.send(nekoEmbed);
    });
}
module.exports.help = {
    Name: "Neko",
    Aliases: ["neko"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["neko"],
    Description: "Shows neko images/GIF."
};