const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (db.get(`guild.${message.guild.id}.nsfw`) === false) {
        db.set(`guild.${message.guild.id}.nsfw`, true);
        return message.channel.send("You activated the NSFW category for this guild.");
    } else {
        db.set(`guild.${message.guild.id}.nsfw`, false);
        return message.channel.send("You deactivated the NSFW category for this guild.");
    }
};
module.exports.help = {
    Name: "NSFW",
    Aliases: ["nsfw"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["nsfw"],
    Description: "Activates/Deactivates the NSFW category for your guild."
};