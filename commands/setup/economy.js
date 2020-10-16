const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (db.get(`guild.${message.guild.id}.economy`) === false) {
        db.set(`guild.${message.guild.id}.economy`, true);
        return message.channel.send("You activated the economy category for this guild.");
    } else {
        db.set(`guild.${message.guild.id}.music`, false);
        return message.channel.send("You deactivated the economy category for this guild.");
    }
};
module.exports.help = {
    Name: "Economy",
    Aliases: ["economy"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["economy"],
    Description: "Activates/Deactivates the economy category for your guild."
};