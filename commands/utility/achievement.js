const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    let yellowtext = args.join(`+`).split(`|`)[0];
    let whitetext = args.join(`+`).split(`|`)[1];

    if (!args.join(` `).includes(`|`)) return message.channel.send(`Wrong command usage.\nachievement <yellowtext>|<whitetext>`);
    const achievement = new Discord.MessageEmbed()
        .setImage(`https://minecraftskinstealer.com/achievement/${Math.round(Math.random()*39)}/${yellowtext}%21/${whitetext}`);
    message.channel.send({ embed: achievement });
};
module.exports.help = {
    Name: "Achievement",
    Aliases: ["achievement"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["achievement [yellow text|white text]"],
    Description: "Generates a Minecraft Achievement."
};