const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
    let loveEmbed = new Discord.MessageEmbed()
        .setDescription(`${message.author} you are being loved by ${member} this much: ${Math.floor(love)}%\n${loveLevel}`)
        .setTimestamp();
    return message.channel.send(loveEmbed);
}
module.exports.help = {
    Name: "Ship",
    Aliases: ["ship", "love"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["ship [@member]"],
    Description: "Calculates Love between you and someone."
};