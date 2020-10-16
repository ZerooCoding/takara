const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.cuddle().then(cuddleGIF => {
        let cuddleEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were cuddled by ${message.author}`)
            .setImage(cuddleGIF.url)
            .setTimestamp();
        return message.channel.send(cuddleEmbed);
    });
}
module.exports.help = {
    Name: "Cuddle",
    Aliases: ["cuddle"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["cuddle [@member]"],
    Description: "Cuddle someone."
};