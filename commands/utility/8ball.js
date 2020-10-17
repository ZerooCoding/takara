const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    let answers = ["Yes.", "No.", "Ask Again Later.", "Not Now.", "Maybe Later."];
    let index = Math.floor(Math.random() * answers.length);
    if (!args[0]) return message.channel.send("You didn't input any question...");
    const eightBall = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
        .addField("Your Question", `\`\`\`${args.join(" ")}\`\`\``)
        .addField("My Answer", `\`\`\`${answers[index]}\`\`\``)
        .setTimestamp();
    return message.channel.send(eightBall);
};
module.exports.help = {
    Name: "8Ball",
    Aliases: ["8ball", "ask", "eightball", "eight-ball", "8-ball"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["8ball [question]"],
    Description: "Randomly answers your question."
};