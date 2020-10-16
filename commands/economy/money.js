const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
};
module.exports.help = {
    Name: "Money",
    Aliases: ["money", "balance"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["money <@member>"],
    Description: "Shows your current balance."
};