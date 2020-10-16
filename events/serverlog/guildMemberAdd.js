const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, member) => {
    member.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${member.guild.id}.join`)}`) {
            const embed02 = new Discord.MessageEmbed()
                .setColor(`GREEN`)
                .setTitle(`${member.user.tag || `Dummy#0000`}`)
                .setThumbnail(`${member.user.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Joined **${member.guild.name}**!\nThe guild now has **${member.guild.memberCount} member**.`)
                .setFooter(`User ID: ${member.id}`)
                .setTimestamp();
            if (!member.user.bot) channel.send({ embed: embed02 });
        }
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`GREEN`)
                .setAuthor(`${member.user.tag || `Dummy#0000`}`, `${member.user.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Member joined.`)
                .addFields(
                    { name: `Joined at`, value: `${member.joinedAt}` },
                    { name: `Created at`, value: `${member.user.createdAt}` })
                .setFooter(`User ID: ${member.user.id}`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}