const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, oldChannel, newChannel) => {
    newChannel.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            if (newChannel.name !== oldChannel.name) {
                const embed01 = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setAuthor(`${newChannel.guild.name || `Dummy`}`, `${newChannel.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`${newChannel} has been edited.`)
                    .addFields(
                        { name: `Old Name`, value: `\`#${oldChannel.name || `No Name`}\`` },
                        { name: `New Name`, value: `\`#${newChannel.name || `No Name`}\`` },
                        { name: `Jump To Channel`, value: `[Click here](https://discord.com/channels/${newChannel.guild.id}/${newChannel.id}/)` })
                    .setFooter(`Channel ID: ${newChannel.id}`)
                    .setTimestamp();
                channel.send({ embed: embed01 });
            }
            if (newChannel.nsfw && !oldChannel.nsfw) {
                const embed02 = new Discord.MessageEmbed()
                    .setColor(`GREEN`)
                    .setAuthor(`${newChannel.guild.name || `Dummy`}`, `${newChannel.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`${newChannel} has been marked as NSFW.`)
                    .addField(`Jump To Channel`, `[Click here](https://discord.com/channels/${newChannel.guild.id}/${newChannel.id}/)`)
                    .setFooter(`Channel ID: ${newChannel.id}`)
                    .setTimestamp();
                channel.send({ embed: embed02 });
            }
            if (oldChannel.nsfw && !newChannel.nsfw) {
                const embed03 = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setAuthor(`${newChannel.guild.name || `Dummy`}`, `${newChannel.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`${newChannel} is no longer marked as NSFW.`)
                    .addField(`Jump To Channel`, `[Click here](https://discord.com/channels/${newChannel.guild.id}/${newChannel.id}/)`)
                    .setFooter(`Channel ID: ${newChannel.id}`)
                    .setTimestamp();
                channel.send({ embed: embed03 });
            }
            if (oldChannel.userLimit !== newChannel.userLimit) {
                const embed04 = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setAuthor(`${newChannel.guild.name || `Dummy`}`, `${newChannel.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`${newChannel} has been edited.`)
                    .addFields(
                        { name: `Old User Limit`, value: `\`${oldChannel.userLimit || `No Limit`}\`` },
                        { name: `New User Limit`, value: `\`${newChannel.userLimit || `No Limit`}\`` },
                        { name: `Jump To Channel`, value: `[Click here](https://discord.com/channels/${newChannel.guild.id}/${newChannel.id}/)` })
                channel.send({ embed: embed04 });
            }
            if (oldChannel.topic !== newChannel.topic) {
                const embed05 = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setAuthor(`${newChannel.guild.name || `Dummy`}`, `${newChannel.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`${newChannel} has been edited.`)
                    .addFields(
                        { name: `Old Topic`, value: `\`${oldChannel.topic || `No Topic`}\`` },
                        { name: `New Topic`, value: `\`${newChannel.topic || `No Topic`}\`` },
                        { name: `Jump To Channel`, value: `[Click here](https://discord.com/channels/${newChannel.guild.id}/${newChannel.id}/)` })
                channel.send({ embed: embed05 });
            }
        }
    });
}