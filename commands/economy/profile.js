const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member);
    let marriedWith = "";
    if (!db.get(`user.${member.id}.married`) || db.get(`user.${member.id}.married`) === null) marriedWith = "Not married.";
    else marriedWith = `<@${db.get(`user.${member.id}.married`)}>`;
    let biography = "";
    if (!db.get(`user.${member.id}.bio`) || db.get(`user.${member.id}.bio`) === null) biography = "No biography found.";
    else biography = db.get(`user.${member.id}.bio`);
    let birthday = "";
    if (!db.get(`user.${member.id}.birthday`) || db.get(`user.${member.id}.birthday`) === null) birthday = "No birthday found.";
    else birthday = db.get(`user.${member.id}.birthday`);
    if (!db.get(`money_${member.id}`)) db.set(`money_${member.id}`, 0);
    let money = db.get(`money_${member.id}`);
    if (!db.get(`level_${member.id}.level`)) db.set(`level_${member.id}.level`, 0);
    let level = db.get(`level_${member.id}.level`);
    if (!db.get(`user.${member.id}.rank`)) db.set(`user.${member.id}.rank`, "user");
    let rank = db.get(`user.${member.id}.rank`).toUpperCase();

    let profileEmbed = new Discord.MessageEmbed()
        .setAuthor(`${rank} | ${member.user.tag}`, member.user.avatarURL({ dynamic: true }))
        .setDescription(biography)
        .addField("Bithday", birthday)
        .addField("Married", marriedWith)
        .setTimestamp();
    if (db.get(`guild.${message.guild.id}.economy`) === true) profileEmbed.addField("Current Balance", `${money}${db.get(`guild.${message.guild.id}.currency`)}`)
    if (db.get(`guild.${message.guild.id}.level`) === true) profileEmbed.addField("Level", level)
    if (db.get(`user.${member.id}.profilecolor`)) profileEmbed.setColor(db.get(`user.${member.id}.profilecolor`));
    if (member.id !== message.author.id || !args[0]) return message.channel.send(profileEmbed);
    if (args[0] && args[0].toLowerCase() === "birthday") {
        if (!args[1]) return message.channel.send("You didn't input your birthday...");
        if (args[1].toLowerCase() === "remove") {
            db.delete(`user.${message.author.id}.birthday`);
            return message.channel.send("Your birthday has been removed");
        }
        db.set(`user.${message.author.id}.birthday`, args[1]);
        return message.channel.send("You birthday has been set to " + db.get(`user.${message.author.id}.birthday`) + "\nYou can remove it with \`profile birthday remove\`");
    } else if (args[0].toLowerCase() === "biography") {
        if (!args[1]) return message.channel.send("You didn't input anything for your biography");
        if (args[1].toLowerCase() === "remove") {
            db.delete(`user.${message.author.id}.bio`);
            return message.channel.send("Your biography has been removed");
        }
        db.set(`user.${message.author.id}.bio`, args.slice(1).join(" "));
        return message.channel.send("Your biography has been set to " + db.get(`user.${message.author.id}.bio`) + "\nYou can remove it with \`profile biography remove\`");
    } else if (args[0].toLowerCase() === "color") {
        if (!args[1]) return message.channel.send("You didn't input any color...");
        if (args[1].toLowerCase() === "remove") {
            db.delete(`user.${message.author.id}.profilecolor`);
            return message.channel.send("Your profile color has been removed");
        }
        db.set(`user.${message.author.id}.profilecolor`, args[1]);
        return message.channel.send("Your profile color has been set to " + db.get(`user.${message.author.id}.profilecolor`) + "\nYou can remove it with \`profile color remove\`");
    } 
};
module.exports.help = {
    Name: "Profile",
    Aliases: ["profile"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["profile", "profile birthday [birthday]", "profile biography [biography]", "profile color [color]"],
    Description: "Shows your profile."
};