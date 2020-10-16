const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, role) => {
    role.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setAuthor(`${role.guild.name || `Dummy`}`, `${role.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Role has been deleted.`)
                .addField(`Role Name`, `${role.name || `No Name.`}`)
                .addField(`Color`, `${role.hexColor || `Default.`}`)
                .addField(`Created At`, `${role.createdAt || `Error.`}`)
                .setFooter(`Role ID: ${role.id}`)
                .setTimestamp();
            return channel.send({ embed: embed01 });
        }
    });
}