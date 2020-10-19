module.exports.run = async (Client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have enough permissions...");
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention any member...");
    if (!member.kickable) return message.channel.send("I can't kick this member... Make sure I have permissions and that my role is high enough!");
    let kickreason = "";
    if (args[1]) kickreason = args.slice(1).join(" ");
    else kickreason = "no reason given";
    try {
        await member.kick({ reason: `Kicked by ${message.author.tag} (ID: ${message.author.id}) | Reason: ${kickreason}` });
        return message.channel.send(`The member has been kicked for ${kickreason}.`);
    } catch (error) {
        return message.channel.send(error.message);
    }
};
module.exports.help = {
    Name: "Kick",
    Aliases: ["kick"],
    Category: "Moderation",
    Permissions: ["KICK_MEMBERS"],
    Usage: ["kick [member] <reason>"],
    Description: "Kicks a member."
};