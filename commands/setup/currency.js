const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.channel.send("The current currency for this guild is: " + db.get(`guild.${message.guild.id}.currency`));
    if (args[0]) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
        db.set(`guild.${message.guild.id}.currency`, args[0]);
        return message.channel.send("The new currency for this guild is: " + db.get(`guild.${message.guild.id}.currency`));
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