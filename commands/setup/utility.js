const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    if (db.get(`guild.${message.guild.id}.utility`) === false) {
        db.set(`guild.${message.guild.id}.utility`, true);
        return message.channel.send("You activated the utility category for this guild.");
    } else {
        db.set(`guild.${message.guild.id}.utility`, false);
        return message.channel.send("You deactivated the utility category for this guild.");
    }
};
module.exports.help = {
    Name: "Utility",
    Aliases: ["utility"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["utility"],
    Description: "Activates/Deactivates the utility category for your guild."
};