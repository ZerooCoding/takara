const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    sfw.woof().then(dog => {
        let dogEmbed = new Discord.MessageEmbed()
            .setImage(dog.url)
            .setTimestamp();
        return message.channel.send(dogEmbed);
    });
};
module.exports.help = {
    Name: "Dog",
    Aliases: ["dog", "woof"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["dog"],
    Description: "Generates random dog images."
};