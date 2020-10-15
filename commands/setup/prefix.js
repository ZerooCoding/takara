const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    const currentPrefix = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription("The current prefix for this guild is " + db.get(`guild.${message.guild.id}.prefix`))
        .setTimestamp();
    if (!args[0]) return message.channel.send(currentPrefix);
    if (args[0]) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
        db.set(`guild.${message.guild.id}.prefix`, args[0]);
        const newPrefix = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription("The new prefix for this guild is " + db.get(`guild.${message.guild.id}.prefix`))
            .setTimestamp();
        return message.channel.send (newPrefix);
    }
};
module.exports.help = {
    Name: "Prefix",
    Aliases: ["prefix"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["prefix", "prefix <prefix>"],
    Description: "Changes the prefix for your guild."
};