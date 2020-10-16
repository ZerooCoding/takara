const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (!db.get(`guild.${message.guild.id}.globalchat`)) {
        db.set(`guild.${message.guild.id}.globalchat`, message.channel.id);
        message.channel.send("You set the globalchat to this channel.");
    } else {
        db.delete(`guild.${message.guild.id}.globalchat`);
        message.channel.send("You deleted the globalchat.");
    }
};
module.exports.help = {
    Name: "Globalchat",
    Aliases: ["globalchat"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["globalchat"],
    Description: "Sets the globalchat for your guild."
};