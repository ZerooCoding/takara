const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    const inviteEmbed = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
        .addField("Bot Invite", "[[Administrator Permissions](https://discord.com/api/oauth2/authorize?client_id=728720543003705395&permissions=8&scope=bot)] (Recommended)\n[[Required Permissions](https://discord.com/api/oauth2/authorize?client_id=728720543003705395&permissions=305523959&scope=bot)]")
        .addField("Support Server", "[[Click Here](https://discord.gg/CuRS4bY)]")
        .setTimestamp();
    return message.channel.send(inviteEmbed);
};
module.exports.help = {
    Name: "Invite",
    Aliases: ["invite"],
    Category: "Main",
    Permissions: ["None"],
    Usage: ["invite"],
    Description: "Invite to the support server and for the bot."
};