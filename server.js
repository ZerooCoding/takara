const Discord = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const Client = new Discord.Client();

fs.readdir("./events/client/", (error, files) => {
    if (error) console.error(error);
    files.forEach(file => {
        const event = require("./events/client/" + file);
        let eventName = file.split(".")[0];
        Client.on(eventName, event.bind(null, Client));
        console.log("[Event:Client] " + file);
    });
});

Client.login(process.env.TOKEN);