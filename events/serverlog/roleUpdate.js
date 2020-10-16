const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, oldRole, newRole) => {
    newRole.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            if (oldRole.name !== newRole.name) {
                const embed01 = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setAuthor(`${newRole.guild.name || `Dummy`}`, `${newRole.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`Role has been edited.`)
                    .addField(`Old Name`, `${oldRole.name || `Error.`}`)
                    .addField(`New Name`, `${newRole.name || `Error.`}`)
                    .setFooter(`Role ID: ${newRole.id}`)
                    .setTimestamp();
                return channel.send({ embed: embed01 });
            }
            if (oldRole.hexColor !== newRole.hexColor) {
                const embed02 = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setAuthor(`${newRole.guild.name || `Dummy`}`, `${newRole.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`Role has been edited.`)
                    .addField(`Old Color`, `${oldRole.hexColor || `Default.`}`)
                    .addField(`New Color`, `${newRole.hexColor || `Default.`}`)
                    .setFooter(`Role ID: ${newRole.id}`)
                    .setTimestamp();
                return channel.send({ embed: embed02 });
            }
            if (oldRole.position !== newRole.position) {
                const embed03 = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setAuthor(`${newRole.guild.name || `Dummy`}`, `${newRole.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`Role has been edited.`)
                    .addField(`Old Position`, `${oldRole.position || `Error.`}`)
                    .addField(`New Position`, `${newRole.position || `Error.`}`)
                    .setFooter(`Role ID: ${newRole.id}`)
                    .setTimestamp();
                return channel.send({ embed: embed03 });
            }
        }
    });
}