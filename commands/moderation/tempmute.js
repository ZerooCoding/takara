const ms = require("ms");
module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have enough permissions");
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention any member...");
    let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");
    if (!role) {
        try {
            role = await message.guild.roles.create({
                data: {
                    name: "muted",
                    color: "#000001",
                },
                reason: "Mute Role"
            });
            message.guild.channels.cache.forEach(async channel => {
                await channel.createOverwrite(role.id, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                }
                );
            });
        } catch (error) {
            return message.channel.send(error.message);
        }
    }
    try {
        if (member.roles.cache.has(role.id)) return message.channel.send("Member is already muted...");
        let timeout = args[1];
        if (!ms(timeout)) {
            timeout = "10m";
            message.channel.send("You didn't specify any time. The dafault mute time will be 10 minutes");
        } 
        await member.roles.add(role.id);
        message.channel.send("Member has been muted for " + timeout);
        setTimeout(async () => {
            if (!member.roles.cache.has(role.id)) return;
            await member.roles.remove(role.id);
            message.channel.send(`${member} has been unmuted because the mutetime run out...`);
        }, ms(timeout));
    } catch (error) {
        await member.roles.remove(role.id).catch(e => message.channel.send(e.message));
        return message.channel.send(error.message);
    }
};
module.exports.help = {
    Name: "Tempute",
    Aliases: ["tempmute"],
    Category: "Moderation",
    Permissions: ["KICK_MEMBERS"],
    Usage: ["tempmute [member] [time]"],
    Description: "Temporarily mutes a member."
};