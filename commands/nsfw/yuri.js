const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.yuri().then(yuri => {
        let yuriEmbed = new Discord.MessageEmbed()
            .setImage(yuri.url)
            .setTimestamp();
        return message.channel.send(yuriEmbed);
    });
}
module.exports.help = {
    Name: "Yuri",
    Aliases: ["yuri"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["yuri"],
    Description: "Shows yuri images/GIF."
};