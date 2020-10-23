const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (Client, message, args) => {
    const uptimeEmbed = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
        .setDescription("The bot is currently listed on the following lists:\n[discordbotlist.com](https://discordbotlist.com/bots/takara)\n[bots.ondiscord.xyz](https://bots.ondiscord.xyz/bots/728720543003705395)\n[discord.bots.gg](https://discord.bots.gg/bots/728720543003705395)\n[top.gg](https://top.gg/bot/728720543003705395)")
        .setTimestamp();
    return message.channel.send(uptimeEmbed);
};
module.exports.help = {
    Name: "Support",
    Aliases: ["support"],
    Category: "Main",
    Permissions: ["None"],
    Usage: ["support"],
    Description: "Shows all the bot lists where the bot is listed."
};