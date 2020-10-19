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
    if (!member.roles.cache.has(role.id)) return message.channel.send("Member isn't muted...");
    try {
        await member.roles.remove(role.id).catch(e => message.channel.send(e.message));
        return message.channel.send(`${member} has been unmuted`);
    } catch (error) {
        await member.roles.add(role.id).catch(e => message.channel.send(e.message));
        return message.channel.send(error.message);
    }
};
module.exports.help = {
    Name: "Unmute",
    Aliases: ["unmute"],
    Category: "Moderation",
    Permissions: ["KICK_MEMBERS"],
    Usage: ["unmute [member]"],
    Description: "Unmutes a muted member."
};