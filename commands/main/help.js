const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    const commandList = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
    if (!args[0]) return message.channel.send(commandList);
    if (args[0]) {
        let command = args[0].toLowerCase();
        if (Client.commands.has(command)) {
            command = Client.commands.get(command);
            const validCommand = new Discord.MessageEmbed()
                .setAuthor(Client.user.tag, Client.user.avatarURL())
                .addField("Command", command.help.Name, true)
                .addField("Aliases", command.help.Aliases.join(", "), true)
                .addField("Category", command.help.Category, true)
                .addField("Required Permissions", command.help.Permissions.join(", "), true)
                .addField("Description", command.help.Description, true)
                .addField("Usage", command.help.Usage.join("\n"), true)
                .setFooter("Usage Syntax: <> = Optional")
                .setTimestamp();
            return message.channel.send(validCommand);
        } else {
            const invalidCommand = new Discord.MessageEmbed()
                .setAuthor(Client.user.tag, Client.user.avatarURL())
                .setDescription("I couldn't find your command in my list.")
                .setTimestamp();
            return message.channel.send(invalidCommand);
        }
    }
};
module.exports.help = {
    Name: "Help",
    Aliases: ["help", "commands"],
    Category: "Main",
    Permissions: ["None"],
    Usage: ["help", "help <Command>"],
    Description: "Get informations about every command."
}