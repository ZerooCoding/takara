const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, emoji) => {
    emoji.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`GREEN`)
                .setAuthor(`${emoji.guild.name || `Dummy`}`, `${emoji.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Emoji has been created.`)
                .addField(`Emoji`, `${emoji.name} | ${emoji}`)
                .addField(`Created At`, `${emoji.createdAt}`)
                .addField(`Animated?`, `${emoji.animated || `false`}`)
                .addField(`URL`, `[Click here](${emoji.url})`)
                .setFooter(`Emoji ID: ${emoji.id}`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}