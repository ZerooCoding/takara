const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member);
    if (!db.get(`user.${member.id}.items.rod`)) db.set(`user.${member.id}.items.rod`, 0); 
    let rods = db.get(`user.${member.id}.items.rod`)
    if (!db.get(`user.${member.id}.items.waste`)) db.set(`user.${member.id}.items.waste`, 0);
    let waste = db.get(`user.${member.id}.items.waste`)
    if (!db.get(`user.${member.id}.items.fish`)) db.set(`user.${member.id}.items.fish`, 0);
    let fish = db.get(`user.${member.id}.items.fish`)
    if (!db.get(`user.${member.id}.items.pickaxe`)) db.set(`user.${member.id}.items.pickaxe`, 0);
    let pickaxes = db.get(`user.${member.id}.items.pickaxe`)
    if (!db.get(`user.${member.id}.items.stone`)) db.set(`user.${member.id}.items.stone`, 0);
    let stones = db.get(`user.${member.id}.items.stone`)
    if (!db.get(`user.${member.id}.items.iron`)) db.set(`user.${member.id}.items.iron`, 0);
    let iron = db.get(`user.${member.id}.items.iron`)
    if (!db.get(`user.${member.id}.items.diamond`)) db.set(`user.${member.id}.items.diamond`, 0);
    let diamonds = db.get(`user.${member.id}.items.diamond`)
    
    const itemList = new Discord.MessageEmbed()
        .addField("Items", 
`💎 Diamonds: ${diamonds}
⛓️ Iron: ${iron}
🪨 Stones: ${stones}
⛏️ Pickaxes: ${pickaxes}
🎣 Fishing Rods: ${rods}
🐟 Fish: ${fish}
🔩 Waste: ${waste}`)
        .setTimestamp();
    return message.channel.send(itemList);
};
module.exports.help = {
    Name: "Items",
    Aliases: ["items", "inventory", "inv"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["items [member]"],
    Description: "Shows all your items."
};