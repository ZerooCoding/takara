const Discord = require(`discord.js`);
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (db.get(`guild.${message.guild.id}.music`) === false) return message.channel.send("Music isn't activated on this guild.\nActivate it with the \`music\` command in the setup category.");
    const { channel } = message.member.voice;
    const novoicechannel = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`You're not in a voicechannel.`)
        .setTimestamp();
    if (!channel) return message.channel.send({ embed: novoicechannel });
    const serverQueue = message.client.queue.get(message.guild.id);
    const noqueue = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`There is nothing playing.`)
        .setTimestamp();
    if (!serverQueue) return message.channel.send({ embed: noqueue });
    serverQueue.connection.dispatcher.end('Skip command has been used!');
    const songskipped = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`⏭️ __**Skipped:**__\n${serverQueue.songs[0].title}.`)
        .setTimestamp();
    message.channel.send({ embed: songskipped });
};
module.exports.help = {
    Name: "Skip",
    Aliases: ["skip"],
    Category: "Music",
    Permissions: ["None"],
    Usage: ["skip"],
    Description: "Skips the current playing song."
};