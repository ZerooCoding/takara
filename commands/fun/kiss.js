const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.kiss().then(kissGIF => {
        let kissEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were kissed by ${message.author}`)
            .setImage(kissGIF.url)
            .setTimestamp();
        return message.channel.send(kissEmbed);
    });
}
module.exports.help = {
    Name: "Kiss",
    Aliases: ["kiss"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["kiss [@member]"],
    Description: "Kiss someone."
};