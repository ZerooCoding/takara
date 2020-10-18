const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send("You didn't mention anyone to marry...");
    if (member.user.bot) return message.channel.send("You can't marry a bot");
    if (db.get(`user.${message.author.id}.items.ring`) <= 0) return message.channel.send("You don't have any marriage ring... Buy one at the shop!");
    if (!db.get(`user.${message.author.id}.married`)) db.set(`user.${message.author.id}.married`, null);
    if (!db.get(`user.${member.id}.married`)) db.set(`user.${member.id}.married`, null);
    if (db.get(`user.${message.author.id}.married`) !== null) return message.channel.send(`You're already married...`);
    if (db.get(`user.${member.id}.married`) !== null) return message.channel.send(`${member} is already married...`);
    message.channel.send(`${member} you got 120 seconds to reply!`).then(msg => {
        msg.react('✅');
        msg.react('❎');
        const acceptFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === member.id;
        const declineFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === member.id;
        const filter = (reaction, user) => reaction.emoji.name === '⬜';
        const accepted = msg.createReactionCollector(acceptFilter, { time: 120000 });
        const declined = msg.createReactionCollector(declineFilter, { time: 120000 });
        const timer = msg.createReactionCollector(filter, { time: 120000 });
        accepted.on("collect", (r, u) => {
            if (db.get(`user.${message.author.id}.married`) !== null) return message.channel.send(`${message.author} you already married someone else... You cant marry ${member} anymore!`);
            if (db.get(`user.${member.id}.married`) !== null) return message.channel.send(`${member} already married someone else...`);
            msg.reactions.removeAll().catch(error => message.channel.send(error.message));
            db.subtract(`user.${message.author.id}.items.ring`, 1);
            message.channel.send(`${message.author} your marriage proposal was accepted by ${member}`);
            db.set(`user.${message.author.id}.married`, member.id);
            db.set(`user.${member.id}.married`, message.author.id);
        });
        declined.on("collect", (r, u) => {
            return message.channel.send(`We're not going to have a wedding... ${message.author} your marriage proposal was declined...`);
        });
        timer.on("end", () => {
            if (db.get(`user.${message.author.id}.married`) !== null && db.get(`user.${message.author.id}.married`) !== null) return;
            msg.reactions.removeAll().catch(error => message.channel.send(error.message));
            const nobodyAnswered = new Discord.MessageEmbed()
                .setDescription(`${message.author} he/she didn't answer... You should give him/her more time to think about it. Better luck next time!`)
                .setTimestamp();
            msg.edit({ embed: nobodyAnswered });
        });
    });
};
module.exports.help = {
    Name: "Marry",
    Aliases: ["marry"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["marry [member]"],
    Description: "Marry someone."
};