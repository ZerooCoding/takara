module.exports.run = async (Client, message, args) => {
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
    let mutereason = "";
    if (args[1]) mutereason = args.slice(1).join(" ");
    else mutereason = "no reason given";
    try {
        if (member.roles.cache.has(role.id)) return message.channel.send("Member is already muted...");
        await member.roles.add(role.id);
        message.channel.send("Member has been muted for: " + mutereason);
    } catch (error) {
        await member.roles.remove(role.id).catch(e => message.channel.send(e.message));
        return message.channel.send(error.message);
    }
};
module.exports.help = {
    Name: "Mute",
    Aliases: ["mute"],
    Category: "Moderation",
    Permissions: ["KICK_MEMBERS"],
    Usage: ["mute [member] <reason>"],
    Description: "Mutes a member."
};