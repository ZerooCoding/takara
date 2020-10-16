const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    sfw.foxGirl().then(foxGirl => {
        let foxGirlEmbed = new Discord.MessageEmbed()
            .setImage(foxGirl.url)
            .setTimestamp();
        return message.channel.send(foxGirlEmbed);
    });
}
module.exports.help = {
    Name: "Fox Girl",
    Aliases: ["foxgirl"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["foxgirl"],
    Description: "Shows fox girl images/GIF."
};