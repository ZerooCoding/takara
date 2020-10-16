const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.baka().then(bakaGIF => {
        let bakaEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were called stupid by ${message.author}`)
            .setImage(bakaGIF.url)
            .setTimestamp();
        return message.channel.send(bakaEmbed);
    });
}
module.exports.help = {
    Name: "Baka",
    Aliases: ["baka", "stupid"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["baka [@member]"],
    Description: "Calls someone stupid."
};