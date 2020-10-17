const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    const thisGuild = new Discord.MessageEmbed()
        .setAuthor(message.guild.name)
        .setImage(message.guild.iconURL({ dynamic: true }))
        .setTimestamp();
    if (!args[0]) return message.channel.send(thisGuild);
    if (args[0]) {
        try {
            let guild = Client.guilds.cache.get(args[0]);
            if (!guild) return message.channel.send("I wasn't able to find the guild... Make sure I am on this guild!");
            const guildIcon = new Discord.MessageEmbed()
            .setAuthor(guild.name)
                .setImage(guild.iconURL({ dynamic: true })); 
            if (guild) return message.channel.send(guildIcon);
        } catch (error) {
            return message.channel.send(error.message);
        }
    }
};
module.exports.help = {
    Name: "Icon",
    Aliases: ["icon", "serverpicture", "sp"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["icon <guild>"],
    Description: "Shows the guild icon."
};