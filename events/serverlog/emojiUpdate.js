const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, oldEmoji, newEmoji) => {
    newEmoji.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            if (oldEmoji.name === newEmoji.name) return;
            const embed01 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setAuthor(`${newEmoji.guild.name || `Dummy`}`, `${newEmoji.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Emoji has been updated.`)
                .addField(`Old Emoji`, `${oldEmoji.name} | ${oldEmoji}`)
                .addField(`New Emoji`, `${newEmoji.name} | ${newEmoji}`)
                .addField(`URL`, `[Click here](${newEmoji.url})`)
                .setFooter(`Emoji ID: ${newEmoji.id}`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}