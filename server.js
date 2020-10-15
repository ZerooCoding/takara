const Discord = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const Client = new Discord.Client();

Client.aliases = new Map();
Client.commands = new Map();
Client.queue = new Map();

fs.readdir("./events/client/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        const event = require("./events/client/" + file);
        let eventName = file.split(".")[0];
        Client.on(eventName, event.bind(null, Client));
        console.log("[Event:Client] " + eventName.toUpperCase());
    });
});

fs.readdir("./commands/main/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/main/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:Main] " + commandName.toUpperCase());
    });
});

fs.readdir("./commands/music/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/music/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:Music] " + commandName.toUpperCase());
    });
});

fs.readdir("./commands/staff/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/staff/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:Staff] " + commandName.toUpperCase());
    });
});

Client.login(process.env.TOKEN);