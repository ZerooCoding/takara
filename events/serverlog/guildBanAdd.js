const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, guild, user) => {
    guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setAuthor(`${user.tag || `Dummy`}`, `${user.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`User has been banned.`)
                .setFooter(`User ID: ${user.id}`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}