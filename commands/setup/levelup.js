const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (db.get(`guild.${message.guild.id}.levelup`) === false) {
        db.set(`guild.${message.guild.id}.levelup`, true);
        return message.channel.send("You activated levelup messages for this guild.");
    } else {
        db.set(`guild.${message.guild.id}.levelup`, false);
        return message.channel.send("You deactivated the levelup messages for this guild.");
    }
};
module.exports.help = {
    Name: "Level Up",
    Aliases: ["levelup"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["levelup"],
    Description: "Activates/Deactivates the levelup messages for your guild."
};