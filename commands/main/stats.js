const Discord = require("discord.js");
const si = require("systeminformation");
module.exports.run = async (Client, message, args) => {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const os = await si.osInfo();
    let user = 0;
    Client.guilds.cache.forEach(guild => {
        user += guild.memberCount;
    });
    const statisticsEmbed = new Discord.MessageEmbed()
        .setAuthor(Client.user.tag, Client.user.avatarURL())
        .addField("Discord Statistics", `\`\`\`hs\n# Guilds: ${Client.guilds.cache.size}\n# User: ${user}\n# Channel: ${Client.channels.cache.size}\n# Voice Connections: ${Client.voice.connections.size}\n\`\`\``)
        .addField("Host Statistics", `\`\`\`hs\n# Platform: ${os.platform}\n# Distrobution: ${os.distro}\n# Total RAM: ${Math.round(mem.total / 1000000000)}GB\n# Used RAM: ${Math.round(mem.used / 1000000000)}GB\n# CPU: ${cpu.manufacturer} ${cpu.brand}\n# CPU Cores: ${cpu.cores}\n# CPU Speed: ${cpu.speed}GHz\n\`\`\``)
        .setTimestamp();
    return message.channel.send(statisticsEmbed);
};
module.exports.help = {
    Name: "Stats",
    Aliases: ["stats", "statistics", "botinfo", "bot-info", "botinformation", "bot-information"],
    Category: "Main",
    Permissions: ["None"],
    Usage: ["invite"],
    Description: "Shows the bot statistics."
};