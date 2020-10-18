const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member);
    let roles = member.roles.cache.map(r => `${r}`).join(" | ").replace(" | @everyone", "").replace("@everyone", "No roles.");
    if (roles.length > 500) roles = "Too many roles to list.";
    
    let presences = [];
    let status = {
        offline: "Offline",
        online: "Online",
        dnd: "Do Not Disturb",
        idle: "Idle"  
    };
    let devices = {
        desktop: "Desktop",
        web: "Web",
        mobile: "Mobile"
    };
    let badges = {
        VERIFIED_DEVELOPER: "Verified Developer",
        HOUSE_BRILLIANCE: "House Of Brilliance",
        HOUSE_BALANCE: "House Of Balance",
        HOUSE_BRAVERY: "House Of Bravery",
        DISCORD_EMPLOYEE: "Discord Staff",
        DISCORD_PARTNER: "Discord Partner",
        HYPESQUAD_EVENTS: "Hypesquad Events",
        BHUNTER_LEVEL_1: "Bug Hunter Level 1",
        BHUNTER_LEVEL_2: "Bug Hunter Level 2",
        VERIFIED_BOT: "Verified Bot",
        SYSTEM: "System",
        EARLY_SUPPORTER: "Early Supporter",
        TEAM_USER: "Team User"
    };
    let activities = {
        PLAYING: "Playing",
        LISTENING: "Listening",
        WATCHING: "Watching",
        CUSTOM_STATUS: "Custom Status:",
    };

    Object.keys(member.presence.clientStatus || {}).forEach(b => {
        presences.push(`${devices[b]}: ${status[member.presence.clientStatus[b]]}`)
    });

    const userInformation = new Discord.MessageEmbed()
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .addField("Member", `${member.user.tag} (${member.id})`)
        .addField("Bot?", member.user.bot)
        .addField("Presence", (presences.join("\n") || `${status.offline}` + "\n\n" + (member.presence.activities.map(activity => {
            return (activity ? (activities[activity.type] || activity.type) + " " + (activity.type == "CUSTOM_STATUS" ? activity.state : activity.name) : "")
        }).join(",\n"))))
        .addField("Badges", member.user.flags.toArray().map(a => badges[a] || a).join(", ") || "No Badges")
        .addField("Created At", moment.utc(member.user.createdAt).format("Do MMMM YYYY, HH:mm"))
        .addField("Joined At", moment.utc(member.joinedAt).format("Do MMMM YYYY, HH:mm"))
        .addField(`Roles [${member.roles.cache.size -1}]`, roles)
        .addField(`Permissions [${member.permissions.toArray().length}]`, member.permissions.toArray().join(", ").toLowerCase().split("_").join(" "))
        .setTimestamp();
    return message.channel.send(userInformation);
};
module.exports.help = {
    Name: "User Information",
    Aliases: ["userinfo", "user-info", "userinformation", "userinfos", "user-information", "ui"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["userinfo <@member>"],
    Description: "Get information about a member."
};