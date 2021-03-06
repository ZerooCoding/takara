const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.feed().then(feedGIF => {
        let feedEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were fed by ${message.author}`)
            .setImage(feedGIF.url)
            .setTimestamp();
        return message.channel.send(feedEmbed);
    });
}
module.exports.help = {
    Name: "Feed",
    Aliases: ["feed"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["feed [@member]"],
    Description: "Feed someone."
};