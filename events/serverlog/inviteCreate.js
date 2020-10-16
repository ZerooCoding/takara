const Discord = require(`discord.js`);
const db = require(`quick.db`);
module.exports = async (Client, invite) => {
    invite.guild.channels.cache.forEach(channel => {
        if (channel.id === `${db.get(`guild.${channel.guild.id}.serverlog`)}`) {
            const embed01 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setAuthor(`${invite.guild.name || `Dummy`}`, `${invite.guild.iconURL() || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
                .setDescription(`Invite has been created.`)
                .addField(`Invite`, `${invite.url || `Error.`}`)
                .addField(`Channel`, `${invite.channel || `No Channel.`}`)
                .addField(`Max Uses`, `${invite.maxUses || `No Limit.`}`)
                .addField(`Expires At`, `${invite.expiresAt || `Never.`}`)
                .addField(`Created By`, `${invite.inviter.tag || `Dummy#0000`}`)
                .setTimestamp();
            channel.send({ embed: embed01 });
        }
    });
}