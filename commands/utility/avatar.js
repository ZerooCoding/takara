const Discord = require("discord.js");
module.exports.run = async (Client, message, args) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member);
    const avatarEmbed = new Discord.MessageEmbed()
        .setImage(member.user.avatarURL({ dynamic: true }));
    return message.channel.send(avatarEmbed);
};
module.exports.help = {
    Name: "Avatar",
    Aliases: ["avatar", "profilepicture", "pfp"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["avatar [@member]"],
    Description: "Shows the avatar of someone."
};