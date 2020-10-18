const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (Client, message, args) => {
    const currency = db.get(`guild.${message.guild.id}.currency`);
    let rod_buy = 250; let rod_sell = 100;
    let pickaxe_buy = 250; let pickaxe_sell = 100;
    let waste_buy = 8; let waste_sell = 5;
    let fish_buy = 10; let fish_sell = 8;
    let stone_buy = 10; let stone_sell = 8;
    let iron_buy = 20; let iron_sell = 15;
    let diamond_buy = 1500; let diamond_sell = 1000;
    let ring_buy = 150; let ring_sell = 100;
    const shopList = new Discord.MessageEmbed()
        .setAuthor(message.guild.name + " SHOP", message.guild.iconURL({ dynamic: true }))
        .addField("Fishing Rod (\`rod\`)", `📥 ${rod_buy}${currency} | 📤 ${rod_sell}${currency}`)
        .addField("Pickaxe (\`pickaxe\`)", `📥 ${pickaxe_buy}${currency} | 📤 ${pickaxe_sell}${currency}`)
        .addField("Waste (\`waste\`)", `📥 ${waste_buy}${currency} | 📤 ${waste_sell}${currency}`)
        .addField("Fish (\`fish\`)", `📥 ${fish_buy}${currency} | 📤 ${fish_sell}${currency}`)
        .addField("Stone (\`stone\`)", `📥 ${stone_buy}${currency} | 📤 ${stone_sell}${currency}`)
        .addField("Iron (\`iron\`)", `📥 ${iron_buy}${currency} | 📤 ${iron_sell}${currency}`)
        .addField("Diamond (\`diamond\`)", `📥 ${diamond_buy}${currency} | 📤 ${diamond_sell}${currency}`)
        .addField("Marriage Ring (\`ring\`)", `📥 ${ring_buy}${currency} | 📤 ${ring_sell}${currency}`)
        .setFooter("Use the buy and sell commands to use the shop.")
        .setTimestamp();
    return message.channel.send(shopList);
};
module.exports.help = {
    Name: "Shop",
    Aliases: ["shop", "store"],
    Category: "Economy",
    Permissions: ["None"],
    Usage: ["shop"],
    Description: "Shows the shop."
};