const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anybody...");
    sfw.poke().then(pokeGIF => {
        let pokeEmbed = new Discord.MessageEmbed()
            .setDescription(`${member} you were poked by ${message.author}`)
            .setImage(pokeGIF.url)
            .setTimestamp();
        return message.channel.send(pokeEmbed);
    });
}
module.exports.help = {
    Name: "Poke",
    Aliases: ["poke"],
    Category: "Fun",
    Permissions: ["None"],
    Usage: ["poke [@member]"],
    Description: "Poke someone."
};