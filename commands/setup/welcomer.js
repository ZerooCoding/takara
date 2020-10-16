const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to use this command.");
    const welcomerHelp = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription("Do you need help setting up the welcome messages?")
        .addField(db.get(`guild.${message.guild.id}.prefix`) + "welcomer join", "Sets the join message channel to the current channel or deletes it if you already set it.")
        .addField(db.get(`guild.${message.guild.id}.prefix`) + "welcomer leave", "Sets the leave message channel to the current channel or deletes it if you already set it.")
        .setTimestamp();
    if (!args[0]) return message.channel.send(welcomerHelp)
    if (args[0].toLowerCase() === "join") {
        if (!db.get(`guild.${message.guild.id}.join`)) {
            db.set(`guild.${message.guild.id}.join`, message.channel.id);
            message.channel.send("This channel will now receive messages if a member joined.");
        } else {
            db.delete(`guild.${message.guild.id}.join`);
            message.channel.send("The join message channel has been deleted.");
        }
    } else if (args[0].toLowerCase() === "leave") {
        if (!db.get(`guild.${message.guild.id}.leave`)) {
            db.set(`guild.${message.guild.id}.leave`, message.channel.id);
            message.channel.send("This channel will now receive messages if a member left.");
        } else {
            db.delete(`guild.${message.guild.id}.leave`);
            message.channel.send("The leave message channel has been deleted.");
        }
    }
};
module.exports.help = {
    Name: "Welcomer",
    Aliases: ["welcomer", "welcome", "wc"],
    Category: "Setup",
    Permissions: ["MANAGE_GUILD"],
    Usage: ["welcomer join", "welcomer leave"],
    Description: "Sets the welcome channel for your guild."
};