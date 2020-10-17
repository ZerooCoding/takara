const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    const msg = await message.channel.send("Pinging");
    const pingEmbed = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
        .addField("Bot Latency", Math.floor(msg.createdAt - message.createdAt) + "ms")
        .addField("API Latency", Math.round(Client.ws.ping) + "ms")
        .setTimestamp();
    return msg.edit("", { embed: pingEmbed });
};
module.exports.help = {
    Name: "Ping",
    Aliases: ["ping", "pong", "latency"],
    Category: "Main",
    Permissions: ["None"],
    Usage: ["ping"],
    Description: "Shows the current latency."
};