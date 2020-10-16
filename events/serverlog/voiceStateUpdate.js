const Discord = require("discord.js");
const db = require(`quick.db`);
module.exports = async (Client, oldState, newState) => {
    if (oldState.member.user.bot) return;
    if (newState.member.user.bot) return;
    oldState.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            if (oldState.channel && !newState.channel) {
                const left = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setAuthor(`${newState.member.user.tag || `Dummy#0000`}`, `${newState.member.user.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`Left the voice channel \`${oldState.channel.name}\`.`)
                    .setFooter(`User ID: ${newState.member.id} | Channel ID: ${oldState.channel.id}`)
                    .setTimestamp();
                channel.send({ embed: left });
            } else if (newState.channel && !oldState.channel) {
                const joined = new Discord.MessageEmbed()
                    .setColor(`GREEN`)
                    .setAuthor(`${newState.member.user.tag || `Dummy#0000`}`, `${newState.member.user.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`Joined the voice channel \`${newState.channel.name}\`.`)
                    .setFooter(`User ID: ${newState.member.id} | Channel ID: ${newState.channel.id}`)
                    .setTimestamp();
                channel.send({ embed: joined });
            } else if (newState.channel && oldState.channel) {
                if (newState.channel.id === oldState.channel.id) return;
                const switched = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setAuthor(`${newState.member.user.tag || `Dummy#0000`}`, `${newState.member.user.avatarURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                    .setDescription(`Switched voice channel from \`${oldState.channel.name}\` to \`${newState.channel.name}\`.`)
                    .setFooter(`User ID: ${newState.member.id}`)
                    .setTimestamp();
                channel.send({ embed: switched });
            }
        }
    });
}