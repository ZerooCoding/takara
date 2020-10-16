const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, createdChannel) => {
    createdChannel.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`GREEN`)
                .setAuthor(`${createdChannel.guild.name || `Dummy`}`, `${createdChannel.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Channel has been created.`)
                .addFields(
                    { name: `Name`, value: `\`#${createdChannel.name}\`` },
                    { name: `Type`, value: `${createdChannel.type}` },
                    { name: `Jump To Channel`, value: `[Click here](https://discord.com/channels/${createdChannel.guild.id}/${createdChannel.id}/)` })
                .setFooter(`Channel ID: ${createdChannel.id}`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}