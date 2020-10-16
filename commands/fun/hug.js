const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.hug().then(hugGIF => {
        let hugEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were hugged by ${message.author}`)
            .setImage(hugGIF.url)
            .setTimestamp();
        return message.channel.send(hugEmbed);
    });
}
module.exports.help = {
    Name: "Hug",
    Aliases: ["hug"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["hug [@member]"],
    Description: "Hug someone."
};