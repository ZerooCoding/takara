const Discord = require(`discord.js`);
const db = require("quick.db");
const moment = require(`moment`);
module.exports.run = async (Client, message, args) => {
    if (db.get(`guild.${message.guild.id}.music`) === false) return message.channel.send("Music isn't activated on this guild.\nActivate it with the \`music\` command in the setup category.");
    const serverQueue = message.client.queue.get(message.guild.id);
    const noqueue = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`There is nothing playing.`)
        .setTimestamp();
    if (!serverQueue) return message.channel.send({ embed: noqueue });
    const embed02 = new Discord.MessageEmbed()
        .setTitle(`🎶 Now playing: ${serverQueue.songs[0].title}`)
        .setThumbnail(serverQueue.songs[0].thumbnail)
        .addField(`Published by`, serverQueue.songs[0].channel, true)
        .addField(`Published at`, moment.utc(serverQueue.songs[0].publishedAt).format('Do MMMM YYYY'), true)
        .addField(`Duration`, `${serverQueue.songs[0].durationH}h, ${serverQueue.songs[0].durationM}m, ${serverQueue.songs[0].durationS}s`, true)
        .addField(`ID`, `[${serverQueue.songs[0].id}](${serverQueue.songs[0].url})`, true)
        .addField(`Requested by`, `${message.author}`, true)
        .setTimestamp();
    return message.channel.send({ embed: embed02 });
};
module.exports.help = {
    Name: "Now Playing",
    Aliases: ["nowplaying", "npw"],
    Category: "Music",
    Permissions: ["None"],
    Usage: ["nowplaying"],
    Description: "Shows details of the current playing song."
};