const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (!db.get(`guild.${message.guild.id}.serverlog`)) {
        db.set(`guild.${message.guild.id}.serverlog`, message.channel.id);
        message.channel.send("You set the serverlog to this channel.");
    } else {
        db.delete(`guild.${message.guild.id}.serverlog`);
        message.channel.send("You deleted the serverlog.");
    }
};
module.exports.help = {
    Name: "Serverlog",
    Aliases: ["serverlog", "log"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["serverlog"],
    Description: "Sets the serverlog for your guild."
};