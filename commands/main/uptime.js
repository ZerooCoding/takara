const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (Client, message, args) => {
    const uptimeEmbed = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
        .addField("Uptime", moment.duration(Client.uptime).format("D [days], H [hours], m [mins], s [secs]"))
        .setTimestamp();
    return message.channel.send(uptimeEmbed);
};
module.exports.help = {
    Name: "Uptime",
    Aliases: ["uptime"],
    Category: "Main",
    Permissions: ["None"],
    Usage: ["uptime"],
    Description: "Shows how long the bot has been up and running."
};