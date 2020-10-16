const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    nsfw.hentai().then(hentai => {
        let hentaiEmbed = new Discord.MessageEmbed()
            .setImage(hentai.url)
            .setTimestamp();
        return message.channel.send(hentaiEmbed);
    });
}
module.exports.help = {
    Name: "Hentai",
    Aliases: ["hentai"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["hentai"],
    Description: "Shows hentai images/GIF."
};