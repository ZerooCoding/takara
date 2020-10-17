const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    sfw.meow().then(cat => {
        let catEmbed = new Discord.MessageEmbed()
            .setImage(cat.url)
            .setTimestamp();
        return message.channel.send(catEmbed);
    });
};
module.exports.help = {
    Name: "Cat",
    Aliases: ["cat", "meow"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["cat"],
    Description: "Generates random cat images."
};