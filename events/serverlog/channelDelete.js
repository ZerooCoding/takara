const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, deletedChannel) => {
    deletedChannel.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setAuthor(`${deletedChannel.guild.name || `Dummy`}`, `${deletedChannel.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Channel has been deleted.`)
                .addFields(
                    { name: `Name`, value: `\`#${deletedChannel.name}\`` },
                    { name: `Type`, value: `${deletedChannel.type}` })
                .setFooter(`Channel ID: ${deletedChannel.id}`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}