const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.pat().then(patGIF => {
        let patEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were patted by ${message.author}`)
            .setImage(patGIF.url)
            .setTimestamp();
        return message.channel.send(patEmbed);
    });
}
module.exports.help = {
    Name: "Pat",
    Aliases: ["pat"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["pat [@member]"],
    Description: "Pat someone."
};