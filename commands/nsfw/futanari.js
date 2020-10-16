const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.futanari().then(futanari => {
        let futanariEmbed = new Discord.MessageEmbed()
            .setImage(futanari.url)
            .setTimestamp();
        return message.channel.send(futanariEmbed);
    });
}
module.exports.help = {
    Name: "Futanari",
    Aliases: ["futanari"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["futanari"],
    Description: "Shows futanari images/GIF."
};