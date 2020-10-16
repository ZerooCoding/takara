const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (db.get(`guild.${message.guild.id}.fun`) === false) {
        db.set(`guild.${message.guild.id}.fun`, true);
        return message.channel.send("You activated the fun category for this guild.");
    } else {
        db.set(`guild.${message.guild.id}.fun`, false);
        return message.channel.send("You deactivated the fun category for this guild.");
    }
};
module.exports.help = {
    Name: "Fun",
    Aliases: ["fun"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["fun"],
    Description: "Activates/Deactivates the fun category for your guild."
};