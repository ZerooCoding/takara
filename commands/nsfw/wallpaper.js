const Discord = require("discord.js");
const Client = require("nekos.life");
const { sfw, nsfw } = new Client();
module.exports.run = async (Client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("This command is for nsfw channels only!")
    sfw.wallpaper().then(wallpaper => {
        let wallpaperEmbed = new Discord.MessageEmbed()
            .setImage(wallpaper.url)
            .setTimestamp();
        return message.channel.send(wallpaperEmbed);
    });
}
module.exports.help = {
    Name: "Wallpaper",
    Aliases: ["wallpaper"],
    Category: "NSFW",
    Permissions: ["None"],
    Usage: ["wallpaper"],
    Description: "Shows wallpaper images."
};