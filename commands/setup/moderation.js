const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (db.get(`guild.${message.guild.id}.moderation`) === false) {
        db.set(`guild.${message.guild.id}.moderation`, true);
        return message.channel.send("You activated the moderation category for this guild.");
    } else {
        db.set(`guild.${message.guild.id}.moderation`, false);
        return message.channel.send("You deactivated the moderation category for this guild.");
    }
};
module.exports.help = {
    Name: "Moderation",
    Aliases: ["moderation"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["moderation"],
    Description: "Activates/Deactivates the moderation category for your guild."
};