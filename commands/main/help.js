const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let mainCommands = [];
    fs.readdir("./commands/main/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            mainCommands.push(`${file.split(".")[0]}`);
        });
    });
    let musicCommands = [];
    fs.readdir("./commands/music/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            musicCommands.push(`${file.split(".")[0]}`);
        });
    });
    let setupCommands = [];
    fs.readdir("./commands/setup/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            setupCommands.push(`${file.split(".")[0]}`);
        });
    });
    let staffCommands = [];
    fs.readdir("./commands/staff/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            staffCommands.push(`${file.split(".")[0]}`);
        });
    });
    let levelCommands = [];
    fs.readdir("./commands/level/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            levelCommands.push(`${file.split(".")[0]}`);
        });
    });
    let economyCommands = [];
    fs.readdir("./commands/economy/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            economyCommands.push(`${file.split(".")[0]}`);
        });
    });
    let funCommands = [];
    fs.readdir("./commands/fun/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            funCommands.push(`${file.split(".")[0]}`);
        });
    });
    let nsfwCommands = [];
    fs.readdir("./commands/nsfw/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            nsfwCommands.push(`${file.split(".")[0]}`);
        });
    });
    let utilityCommands = [];
    fs.readdir("./commands/utility/", (error, files) => {
        if (error) return console.error(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            utilityCommands.push(`${file.split(".")[0]}`);
        });
    });
    const commandList = new Discord.MessageEmbed()
    setTimeout(() => {
        commandList.setAuthor(Client.user.tag, Client.user.avatarURL())
            .addField(`[${mainCommands.length}] Main`, mainCommands.join(", "))
            .addField(`[${setupCommands.length}] Setup`, setupCommands.join(", "))
            .setTimestamp();
        if (db.get(`user.${message.author.id}.rank`) !== "user" && db.get(`user.${message.author.id}.rank`) !== "premium") commandList.addField(`[${staffCommands.length}] Staff`, staffCommands.join(", "))
        if (db.get(`guild.${message.guild.id}.fun`) === false) commandList.addField(`[${funCommands.length}] Fun (Deactivated)`, funCommands.join(", "));
        else commandList.addField(`[${funCommands.length}] Fun (Activated)`, funCommands.join(", "));
        if (db.get(`guild.${message.guild.id}.music`) === false) commandList.addField(`[${musicCommands.length}] Music (Deactivated)`, musicCommands.join(", "));
        else commandList.addField(`[${musicCommands.length}] Music (Activated)`, musicCommands.join(", "));
        if (db.get(`guild.${message.guild.id}.level`) === false) commandList.addField(`[${levelCommands.length}] Level (Deactivated)`, levelCommands.join(", "));
        else commandList.addField(`[${levelCommands.length}] Level (Activated)`, levelCommands.join(", "));
        if (db.get(`guild.${message.guild.id}.economy`) === false) commandList.addField(`[${economyCommands.length}] Economy (Deactivated)`, economyCommands.join(", "));
        else commandList.addField(`[${economyCommands.length}] Economy (Activated)`, economyCommands.join(", "));
        if (db.get(`guild.${message.guild.id}.utility`) === false) commandList.addField(`[${utilityCommands.length}] Utility (Deactivated)`, utilityCommands.join(", "));
        else commandList.addField(`[${utilityCommands.length}] Utility (Activated)`, utilityCommands.join(", "));
        if (db.get(`guild.${message.guild.id}.nsfw`) === false) commandList.addField(`[${nsfwCommands.length}] NSFW (Deactivated)`, nsfwCommands.join(", "));
        else commandList.addField(`[${nsfwCommands.length}] NSFW (Activated)`, nsfwCommands.join(", "));
        if (!args[0]) return message.channel.send(commandList);
    }, 300);
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
    Description: "Get information about every command."
};