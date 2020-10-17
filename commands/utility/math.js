const Discord = require("discord.js");
const math = require("mathjs");
module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.channel.send("You didn't input anything to calculate...");
    let response;
    try {
        response = math.evaluate(args.join(" "));
        const validInput = new Discord.MessageEmbed()
            .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
            .addField("Output", `\`\`\`js\n${response}\`\`\``)
            .setTimestamp();
        return message.channel.send(validInput);
    } catch (error) {
        return message.channel.send(error.message);
    }
};
module.exports.help = {
    Name: "Math",
    Aliases: ["math", "calc", "calculate"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["math [your math problem]"],
    Description: "Calculates something for you."
};