const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.trap().then(trap => {
        let trapEmbed = new Discord.MessageEmbed()
            .setImage(trap.url)
            .setTimestamp();
        return message.channel.send(trapEmbed);
    });
}
module.exports.help = {
    Name: "Trap",
    Aliases: ["trap"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["trap"],
    Description: "Shows trap images/GIF."
};