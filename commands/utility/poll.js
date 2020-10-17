const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.channel.send("You didn't input any question...");
    const pollEmbed = new Discord.MessageEmbed()
        .setAuthor(args.join(" "))
        .setTimestamp();
    return message.channel.send(pollEmbed).then(message => {
        message.react("👍");
        message.react("👎");
    });
};
module.exports.help = {
    Name: "Poll",
    Aliases: ["poll", "vote"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["poll [question]"],
    Description: "Creates a poll where everyone can vote."
};