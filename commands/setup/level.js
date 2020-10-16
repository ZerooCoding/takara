const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (db.get(`guild.${message.guild.id}.level`) === false) {
        db.set(`guild.${message.guild.id}.level`, true);
        return message.channel.send("You activated the level category for this guild.");
    } else {
        db.set(`guild.${message.guild.id}.level`, false);
        return message.channel.send("You deactivated the level category for this guild.");
    }
};
module.exports.help = {
    Name: "Level",
    Aliases: ["level"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["level"],
    Description: "Activates/Deactivates the level category for your guild."
};