const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.tickle().then(tickleGIF => {
        let tickleEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were poked by ${message.author}`)
            .setImage(tickleGIF.url)
            .setTimestamp();
        return message.channel.send(tickleEmbed);
    });
}
module.exports.help = {
    Name: "Tickle",
    Aliases: ["tickle"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["tickle [@member]"],
    Description: "Tickle someone."
};