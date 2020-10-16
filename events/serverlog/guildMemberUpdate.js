const Discord = require(`discord.js`);
const db = require(`quick.db`);
module.exports = async (Client, oldMember, newMember) => {
    if (oldMember.user.bot) return;
    if (newMember.user.bot) return;
    newMember.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            for (const role of newMember.roles.cache.map(x => x.id)) {
                if (!oldMember.roles.cache.has(role)) {
                    const embed01 = new Discord.MessageEmbed()
                        .setColor(`GREEN`)
                        .setAuthor(`${newMember.user.tag || `Dummy#0000`}`, `${newMember.user.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                        .setDescription(`Was given a the \`${newMember.guild.roles.cache.get(role).name}\` Role.`)
                        .setFooter(`User ID: ${newMember.id} | Role ID: ${newMember.guild.roles.cache.get(role).id}`)
                        .setTimestamp();
                    channel.send({ embed: embed01 });
                }
            }
            for (const role of oldMember.roles.cache.map(x => x.id)) {
                if (!newMember.roles.cache.has(role)) {
                    const embed02 = new Discord.MessageEmbed()
                        .setColor(`RED`)
                        .setAuthor(`${newMember.user.tag || `Dummy#0000`}`, `${newMember.user.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                        .setDescription(`Was removed from the \`${newMember.guild.roles.cache.get(role).name}\` Role.`)
                        .setFooter(`User ID: ${newMember.id} | Role ID: ${newMember.guild.roles.cache.get(role).id}`)
                        .setTimestamp();
                    channel.send({ embed: embed02 });
                }
            }
        }
    });
}