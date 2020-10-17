const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    var list = "";
    for (var i in money) {
        list += `🏅 ${money.indexOf(money[i]) + 1}. ${Client.users.cache.get(money[i].ID.split('_')[1]) ? Client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknwon#0000"} | Balance: ${money[i].data}${db.get(`guild.${message.guild.id}.currency`)}\n`
    }
    const leaderboard = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
        .setDescription(list)
        .setTimestamp();
    return message.channel.send(leaderboard);
};
module.exports.help = {
    Name: "Leaderboard",
    Aliases: ["leaderboard", "lb"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["leaderboard"],
    Description: "Shows the top 10 richest people."
};