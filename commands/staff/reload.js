const Discord = require(`discord.js`);
const config = require(`../../config.json`);
module.exports.run = async (Client, message, args) => {
    if (message.author.id !== config.OWNER) return message.channel.send("Missing permissions...");
    if (!args[1]) return;

    let Category = args[0].toLowerCase();
    let commandName = args[1].toLowerCase();
    try {
        delete require.cache[require.resolve(`../${Category}/${commandName}.js`)];
        Client.commands.delete(commandName);
        const pull = require(`../${Category}/${commandName}.js`);
        Client.commands.set(commandName, pull);
        const embed03 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`}`)
            .setDescription(`Reloaded \`${args[1].toUpperCase()}\` in the \`${args[0].toUpperCase()}\` Category.`)
            .setTimestamp();
        return message.channel.send({ embed: embed03 })
    } catch (error) {
        const embed04 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`}`)
            .setDescription(`Couldn't reload \`${args[1].toUpperCase()}\` in the \`${args[0].toUpperCase()}\` Category.`)
            .setTimestamp();
        return message.channel.send({ embed: embed04 });
    }
};
module.exports.help = {
    Name: "Reload",
    Aliases: ["reload", "rl"],
    Category: "Staff",
    Permissions: ["Developer"],
    Usage: ["reload [category] [command]"],
    Description: "Reloads a Command."
};