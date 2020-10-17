const Discord = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const Client = new Discord.Client();

Client.aliases = new Map();
Client.commands = new Map();
Client.queue = new Map();

console.clear();

fs.readdir("./events/client/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        const event = require("./events/client/" + file);
        let eventName = file.split(".")[0];
        Client.on(eventName, event.bind(null, Client));
        console.log("[Event:Client] " + eventName.toUpperCase());
    });
});

fs.readdir("./events/globalchat/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        const event = require("./events/globalchat/" + file);
        let eventName = file.split(".")[0];
        Client.on(eventName, event.bind(null, Client));
        console.log("[Event:Globalchat] " + eventName.toUpperCase());
    });
});

fs.readdir("./events/serverlog/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        const event = require("./events/serverlog/" + file);
        let eventName = file.split(".")[0];
        Client.on(eventName, event.bind(null, Client));
        console.log("[Event:Serverlog] " + eventName.toUpperCase());
    });
});

fs.readdir("./events/level/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        const event = require("./events/level/" + file);
        let eventName = file.split(".")[0];
        Client.on(eventName, event.bind(null, Client));
        console.log("[Event:Level] " + eventName.toUpperCase());
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

fs.readdir("./commands/setup/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/setup/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:Setup] " + commandName.toUpperCase());
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

fs.readdir("./commands/economy/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/economy/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:Economy] " + commandName.toUpperCase());
    });
});

fs.readdir("./commands/level/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/level/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:Level] " + commandName.toUpperCase());
    });
});

fs.readdir("./commands/fun/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/fun/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:Fun] " + commandName.toUpperCase());
    });
});

fs.readdir("./commands/nsfw/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/nsfw/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:NSFW] " + commandName.toUpperCase());
    });
});

fs.readdir("./commands/utility/", (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require("./commands/utility/" + file);
        let commandName = file.split(".")[0];
        Client.commands.set(commandName, props);
        props.help.Aliases.forEach(alias => {
            Client.aliases.set(alias, commandName);
        });
        console.log("[Command:Utility] " + commandName.toUpperCase());
    });
});

Client.login(process.env.TOKEN);