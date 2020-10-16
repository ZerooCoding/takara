const Discord = require(`discord.js`);
const db = require(`quick.db`);
module.exports = async (Client, message) => {
    if (message.author.bot) return;
    message.guild.channels.cache.forEach(channel => {
        if (message.channel.id === `${db.get(`guild.${channel.guild.id}.globalchat`)}`) return;
        if (message.content.startsWith(`${db.get(`guilds.${message.guild.id}.prefix`)}`)) return;
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setAuthor(`${message.author.tag || `Dummy#0000`}`, `${message.author.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Message has been deleted.`)
                .addFields(
                    { name: `Message`, value: `${message.content || `Error`}` },
                    { name: `Jump To Channel`, value: `[Click here](https://discord.com/channels/${message.guild.id}/${message.channel.id}/)` })
                .setFooter(`User ID: ${message.author.id} | Message ID: ${message.id}`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}