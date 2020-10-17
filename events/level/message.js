const Discord = require("discord.js");
const db = require("quick.db");
module.exports = async (Client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (db.get(`user.${message.author.id}.banned`) === true) return;
    if (db.get(`guild.${message.guild.id}.level`) === false) return;
    if (!db.get(`level_${message.author.id}.level`)) {
        db.set(`level_${message.author.id}.level`, 1);
        db.set(`level_${message.author.id}.xp`, 0);
    }
    let timeout = 30000; // You only get XP every 30 seconds. Change this value to change the cooldown!
    let xpcooldown = await db.fetch(`user.${message.author.id}.xpcooldown`);
    if (xpcooldown !== null && timeout - (Date.now() - xpcooldown) > 0) return;
    let neededXP = 500; // You will need 500 XP for a level up
    let newXP = Math.floor(Math.random() * 10) + 5; // You can get between 5 and 15 XP
    await db.set(`user.${message.author.id}.xpcooldown`, Date.now());
    db.add(`level_${message.author.id}.xp`, newXP);
    if (db.get(`level_${message.author.id}.xp`) >= neededXP) {
        db.set(`level_${message.author.id}.xp`, 0);
        db.add(`level_${message.author.id}.level`, 1);
        const levelUp = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(message.author.tag)
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setDescription("Level Up! Your new Level is: " + db.get(`level_${message.author.id}.level`))
            .setTimestamp();
        if (db.get(`guild.${message.guild.id}.levelup`) === true) message.channel.send(levelUp).then(message => {if (message.deletable) message.delete({ timeout: 4000 })});
    }
};