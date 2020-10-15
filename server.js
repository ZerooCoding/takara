const Discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const Client = new Discord.Client();

Client.on("ready", () => {
    console.log(Client.user.tag);
});

Client.login(process.env.TOKEN);