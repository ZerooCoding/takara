const Discord = require(`discord.js`);
const db = require(`quick.db`);
const config = require("../../config.json");
module.exports.run = async (Client, message, args) => {
    if (message.author.id !== config.OWNER) return message.channel.send("No permission.");
    const content = message.content
        .split(` `)
        .splice(1)
        .join(` `);
    const result = new Promise((resolve, reject) => resolve(eval(content)));
    return result.then(output => {
        if (typeof output !== "string") output = require("util").inspect(output, { depth: 0 });
        const includeEmbed = new Discord.MessageEmbed()
        if (output.includes(process.env.CLIENT_TOKEN)) return;
        if (output.includes(Client.token)) return;
        if (output.includes(`client.token`)) return;
        if (output.includes(`process.env.CLIENT_TOKEN`)) return;
        if (output.includes(`process.env.TOKEN`)) return;
        if (output.includes(`config.TOKEN`)) return;
        if (output.includes(`Client.token`)) return;
        if (output.includes(`Token`)) return;
        if (output.includes(`token`)) return;
        const validEval = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .addField(`Input:`, `\`\`\`js\n${args}\`\`\``)
            .addField(`Output:`, `\`\`\`js\n${output}\`\`\``)
            .setTimestamp();
        return message.channel.send({ embed: validEval });
    }).catch(err => {
        err = err.toString();
        if (err.includes(process.env.CLIENT_TOKEN)) err = err.replace(process.env.CLIENT_TOKEN, `<Token>`);
        const invalidEval = new Discord.MessageEmbed()
            .setTitle(`❌ | Invalid Args!`)
            .addField(`Input:`, `\`\`\`js\n${args}\`\`\``)
            .addField(`Output:`, `\`\`\`js\n${err}\`\`\``)
            .setFooter(`${message.author.tag}`, `${message.author.avatarURL({ dynamic: true }) || `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`}`)
            .setTimestamp();
        return message.channel.send({ embed: invalidEval });
    });
};
module.exports.help = {
    Name: `Eval`,
    Aliases: [`eval`],
    Category: `Team`,
    Permissions: [`Developer`],
    Usage: [`eval [input]`],
    Description: `Evaluate your Javascript Code.`
};