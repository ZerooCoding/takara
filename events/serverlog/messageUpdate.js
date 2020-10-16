const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    if (newMessage.author.bot) return;
    newMessage.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            if (oldMessage.content === newMessage.content) return;
            const embed01 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setAuthor(`${newMessage.author.tag || `Dummy#0000`}`, `${newMessage.author.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Message has been edited.`)
                .addFields(
                    { name: `Old Message`, value: `${oldMessage.content || `Error`}` },
                    { name: `New Message`, value: `${newMessage.content || `Error`}` },
                    { name: `Jump To Message`, value: `[Click here](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})` })
                .setFooter(`User ID: ${newMessage.author.id} | Message ID: ${newMessage.id}`)
                .setTimestamp();
            return channel.send({ embed: embed01 });
        }
    });
    newMessage.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            if (newMessage.pinned && !oldMessage.pinned) {
                const embed02 = new Discord.MessageEmbed()
                    .setColor(`GREEN`)
                    .setAuthor(`${newMessage.author.tag || `Dummy#0000`}`, `${newMessage.author.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`Message has been pinned.`)
                    .addFields(
                        { name: `Message`, value: `${newMessage.content || `Error`}` },
                        { name: `Jump To Message`, value: `[Click here](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})` })
                    .setFooter(`User ID: ${newMessage.author.id} | Message ID: ${newMessage.id}`)
                    .setTimestamp();
                return channel.send({ embed: embed02 });
            }
            if (oldMessage.pinned && !newMessage.pinned) {
                const embed02 = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setAuthor(`${newMessage.author.tag || `Dummy#0000`}`, `${newMessage.author.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`Message has been unpinned.`)
                    .addFields(
                        { name: `Message`, value: `${newMessage.content || `Error`}` },
                        { name: `Jump To Message`, value: `[Click here](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})` })
                    .setFooter(`User ID: ${newMessage.author.id} | Message ID: ${newMessage.id}`)
                    .setTimestamp();
                return channel.send({ embed: embed02 });
            }
        }
    });
}