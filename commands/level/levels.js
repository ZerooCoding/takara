const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let levels = db.all().filter(data => data.ID.startsWith(`level_`)).sort((a, b) => b.data.level - a.data.level);
    levels.length = 10;
    var list = "";
    for (var i in levels) {
        list += `🏅 ${levels.indexOf(levels[i]) + 1}. ${Client.users.cache.get(levels[i].ID.split('_')[1]) ? Client.users.cache.get(levels[i].ID.split('_')[1]).tag : "Unknown#0000"} | Level: ${levels[i].data.level}, XP: ${levels[i].data.xp}\n`;
    }
    const leaderboard = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
        .setDescription(list)
        .setTimestamp();
    return message.channel.send(leaderboard);
};
module.exports.help = {
    Name: "Levels",
    Aliases: ["levels"],
    Category: "Level",
    Permissions: ["None"],
    Usage: ["levels"],
    Description: "Shows the top 10 highest level."
};