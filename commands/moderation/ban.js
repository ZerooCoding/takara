module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have enough permissions...");
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention any member...");
    if (!member.bannable) return message.channel.send("I can't ban this member... Make sure I have permissions and that my role is high enough!");
    let banreason = "";
    if (args[1]) banreason = args.slice(1).join(" ");
    else banreason = "no reason given";
    try {
        await member.ban({ reason: `Banned by ${message.author.tag} (ID: ${message.author.id}) | Reason: ${banreason}` });
        return message.channel.send(`The member has been banned for ${banreason}.`);
    } catch (error) {
        return message.channel.send(error.message);
    }
};
module.exports.help = {
    Name: "Ban",
    Aliases: ["ban"],
    Category: "Moderation",
    Permissions: ["BAN_MEMBERS"],
    Usage: ["ban [member] <reason>"],
    Description: "Bans a member."
};