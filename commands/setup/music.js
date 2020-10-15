const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (db.get(`guild.${message.guild.id}.music`) === false) {
        db.set(`guild.${message.guild.id}.music`, true);
        return message.channel.send("You activated the music category for this guild.");
    } else {
        db.set(`guild.${message.guild.id}.music`, false);
        return message.channel.send("You deactivated the music category for this guild.");
    }
};
module.exports.help = {
    Name: "Music",
    Aliases: ["music"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["music"],
    Description: "Activates/Deactivates the music category for you guild."
};