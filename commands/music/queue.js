const Discord = require(`discord.js`);
module.exports.run = async (Client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    const noqueue = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`There is nothing playing.`)
        .setTimestamp();
    if (!serverQueue) return message.channel.send({ embed: noqueue });
    const embed02 = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .addField(`Server Queue`, `\`\`\`\n${serverQueue.songs.map(song => `- ${song.title}`).join('\n\n')}\n\`\`\``)
        .addField(`Now Playing`, `\`\`\`\n${serverQueue.songs[0].title}\n\`\`\``)
    return message.channel.send({ embed: embed02 });
};
module.exports.help = {
    Name: "Queue",
    Aliases: ["queue", "songs"],
    Category: "Music",
    Permissions: ["None"],
    Usage: ["queue"],
    Description: "Shows all queued songs."
};