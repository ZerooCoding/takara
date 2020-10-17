const Discord = require("discord.js");
const moment = require('moment');
module.exports.run = async (Client, message, args) => {
    let roles = message.guild.roles.cache.map(r => `${r}`).join(" | ").replace("@everyone |", "");
    if (roles.length > 400) roles = "Too many roles to list.";
    let emojis = message.guild.emojis.cache.map(e => `${e}`).join(" | ");
    if (emojis.length > 400) emojis = "Too many emojis to list.";
    let channels = message.guild.channels.cache.map(c => `${c}`).join(" | ");
    if (channels.length > 400) channels = "Too many channel to list.";
    let onlineMembers = message.guild.members.cache.filter(mem => mem.presence.status != "offline").size;
    let bots = message.guild.members.cache.filter(mem => mem.user.bot === true).size;
    let categories = message.guild.channels.cache.filter(channel => channel.type === 'category').size;
    let textChannel = message.guild.channels.cache.filter(channel => channel.type === 'text').size;
    let voiceChannel = message.guild.channels.cache.filter(channel => channel.type === 'voice').size;
    let otherChannel = message.guild.channels.cache.size - textChannel - voiceChannel - categories;
    const guildEmbed = new Discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("Guild", `${message.guild.name} (${message.guild.id})`)
        .addField("Region", message.guild.region)
        .addField("Created At", moment.utc(message.guild.createdAt).format("Do MMMM YYYY, HH:mm"))
        .addField("Owner", `<@${message.guild.ownerID}>`)
        .addField(`Member [${message.guild.memberCount}]`, `${onlineMembers} Online\n${bots} Bots`)
        .addField(`Channels [${message.guild.channels.cache.size}]`, `${voiceChannel} Voice\n${textChannel} Text\n${categories} Categories\n${otherChannel} Other`)
        .addField(`Roles [${message.guild.roles.cache.size - 1}]`, roles)
        .addField(`Emojis [${message.guild.emojis.cache.size}]`, emojis)
    return message.channel.send(guildEmbed);
};
module.exports.help = {
    Name: "Server Information",
    Aliases: ["serverinfo", "serverinformation", "server-info", "server-information", "si"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["serverinfo"],
    Description: "Get information about the current guild."
};