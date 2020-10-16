const Discord = require(`discord.js`);
const db = require(`quick.db`);
module.exports = async (Client, messages) => {
    messages.first().guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setAuthor(`${messages.first().guild.name || `Dummy`}`, `${messages.first().guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`${messages.size} Messages has been bulk deleted in ${messages.first().channel}.`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}