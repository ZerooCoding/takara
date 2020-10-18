const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    let role;
    if (!args[0]) return message.channel.send("You didn't input any role...");
    if (Number(args[0])) {
        try {
            role = message.guild.roles.cache.get(args[0]);
            const roleEmbed = new Discord.MessageEmbed()
                .addField("Role", `${role.name} (${role.id})`)
                .addField("Color", role.color)
                .addField("Position", role.rawPosition)
                .addField("Display Seperately", role.hoist)
                .addField("Mentionable", role.mentionable)
                .addField(`Permissions [${role.permissions.toArray().length}]`, role.permissions.toArray().join(", ").toLowerCase().split("_").join(" "))
                .setTimestamp();
            return message.channel.send(roleEmbed);
        } catch (error) {
            return message.channel.send(error.message);
        }
    } else {
        try {
            role = message.guild.roles.cache.find(role => role.name.toLowerCase() == args[0].toLowerCase());
            const roleEmbed = new Discord.MessageEmbed()
                .addField("Role", `${role.name} (${role.id})`)
                .addField("Color", role.color)
                .addField("Position", role.rawPosition)
                .addField("Display Seperately", role.hoist)
                .addField("Mentionable", role.mentionable)
                .addField(`Permissions [${role.permissions.toArray().length}]`, role.permissions.toArray().join(", ").toLowerCase().split("_").join(" "))
                .setTimestamp();
            return message.channel.send(roleEmbed);
        } catch (error) {
            return message.channel.send("Wasn't able to find the role...");
        }
    }
};
module.exports.help = {
    Name: "Role Information",
    Aliases: ["roleinfo", "roleinformation", "role-info", "role-information", "ri"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["roleinfo [role]"],
    Description: "Shows information about a role."
};