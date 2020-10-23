const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");

module.exports = async (Client, message) => {
    if (message.author.bot) return;
    if (db.get(`user.${message.author.id}.banned`) === true) return;
    if (!db.get(`user.${message.author.id}.rank`)) db.set(`user.${message.author.id}.rank`, "user");
    if (message.channel.id === `${db.get(`guild.${message.guild.id}.globalchat`)}`) {
        const args = message.content.slice(db.get(`guild.${message.guild.id}.prefix`).length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        let command;
        if (Client.commands.has(cmd)) {
            command = Client.commands.get(cmd);
        } else {
            command = Client.commands.get(Client.aliases.get(cmd));
        }
        if (command) return message.channel.send("Please don't use commands in this channel.");
        Client.channels.cache.forEach(async channel => {
            if (channel.id === `${db.get(`guild.${channel.guild.id}.globalchat`)}`) {
                try {
                    if (message.deletable) message.delete({ timeout: 2000 });
                    const messageEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${db.get(`user.${message.author.id}.rank`).toUpperCase()} | ${message.author.id}`)
                        .setTitle(message.author.tag)
                        .setThumbnail(`${message.author.avatarURL({ dynamic: true }) || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`}`)
                        .setDescription(`${message.content || `⠀`}`)
                        .addField(`⠀`, `[Support Server](https://discord.gg/CuRS4bY) | [Bot Invite](https://discord.com/api/oauth2/authorize?client_id=728720543003705395&permissions=305523959&scope=bot)`)
                        .setTimestamp();
                    if (db.get(`user.${message.author.id}.rank`) === "owner") messageEmbed.setColor("RED");
                    if (db.get(`user.${message.author.id}.rank`) === "developer") messageEmbed.setColor("BLUE");
                    if (db.get(`user.${message.author.id}.rank`) === "moderator") messageEmbed.setColor("ORANGE");
                    if (db.get(`user.${message.author.id}.rank`) === "premium") messageEmbed.setColor("YELLOW");
                    if (message.attachments) {
                        message.attachments.forEach(attachment => {
                            messageEmbed.setImage(attachment.url);
                        });
                    }
                    channel.send(messageEmbed);
                } catch (error) {
                    message.channel.send(error.message);
                }
            }
        });
    }
};