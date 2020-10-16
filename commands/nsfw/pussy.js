const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.pussy().then(pussy => {
        let pussyEmbed = new Discord.MessageEmbed()
            .setImage(pussy.url)
            .setTimestamp();
        return message.channel.send(pussyEmbed);
    });
}
module.exports.help = {
    Name: "Pussy",
    Aliases: ["pussy"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["pussy"],
    Description: "Shows pussy images/GIF."
};