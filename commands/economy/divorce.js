const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!db.get(`user.${message.author.id}.married`)) return message.channel.send("You're not married...");
    await message.channel.send(`You are no longer married with <@${db.get(`user.${message.author.id}.married`)}>`);
    await db.delete(`user.${db.get(`user.${message.author.id}.married`)}.married`);
    await db.delete(`user.${message.author.id}.married`);
};
module.exports.help = {
    Name: "Divorce",
    Aliases: ["divorce"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["divorce"],
    Description: "Divorces you from the person you are married to."
};