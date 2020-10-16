const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.slap().then(slapGIF => {
        let slapEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were poked by ${message.author}`)
            .setImage(slapGIF.url)
            .setTimestamp();
        return message.channel.send(slapEmbed);
    });
}
module.exports.help = {
    Name: "Slap",
    Aliases: ["slap", "punch"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["slap [@member]"],
    Description: "Slap someone."
};