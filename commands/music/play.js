const { Util } = require('discord.js');
const Discord = require(`discord.js`);
const moment = require(`moment`);
const dotenv = require('dotenv');
dotenv.config();
const YouTube = require(`simple-youtube-api`);
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const ytdl = require('ytdl-core');
module.exports.run = async (Client, message, args) => {
    const { channel } = message.member.voice;
    const novoicechannel = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`You're not in a voicechannel.`)
        .setTimestamp();
    if (!channel) return message.channel.send({ embed: novoicechannel });

    const permissions = channel.permissionsFor(message.client.user);
    const noconnectperms = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`I don't have permissions to join your voicechannel.`)
        .setTimestamp();
    if (!permissions.has('CONNECT')) return message.channel.send({ embed: noconnectperms });
    const nospeakperms = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`I don't have permissions to talk in your voicechannel.`)
        .setTimestamp();
    if (!permissions.has('SPEAK')) return message.channel.send({ embed: nospeakperms });
    const serverQueue = message.client.queue.get(message.guild.id);

    const noarguments = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
        .setDescription(`You can search for something or input a link.`)
        .setTimestamp();
    if (!args[0]) return message.channel.send({ embed: noarguments });

    const searchString = args.join(" ");
    const url = args[0].replace(/<(.+)>/g, '$1');
    try {
        var video = await youtube.getVideo(url);
    } catch (e) {
        try {
            var videos = await youtube.searchVideos(searchString, 1);
            var video = await youtube.getVideoByID(videos[0].id);
        } catch (e) {
            const nosearchresults = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL() || `https://media3.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif`)
                .setDescription(`I couldn't obtain any search results.`)
                .setTimestamp();
            return message.channel.send({ embed: nosearchresults });
        }
    }
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        publishedAt: video.publishedAt,
        channel: video.channel.title,
        durationH: video.duration.hours,
        durationM: video.duration.minutes,
        durationS: video.duration.seconds,
        thumbnail: video.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    };
    if (serverQueue) {
        await serverQueue.songs.push(song);
        const embed01 = new Discord.MessageEmbed()
            .setDescription(`✅ __**Added to queue:**__\n${song.title}`)
            .setThumbnail(song.thumbnail)
            .addField(`Published by`, song.channel, true)
            .addField(`Published at`, moment.utc(song.publishedAt).format('Do MMMM YYYY'), true)
            .addField(`Duration`, `${song.durationH}h, ${song.durationM}m, ${song.durationS}s`, true)
            .addField(`ID`, `[${song.id}](${song.url})`, true)
            .setTimestamp();
        return message.channel.send({ embed: embed01 });
    }
    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 25,
        playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);
    const play = async song => {
        const queue = await message.client.queue.get(message.guild.id);
        if (!song) {
            queue.voiceChannel.leave();
            message.client.queue.delete(message.guild.id);
            return;
        }
        const dispatcher = queue.connection.play(ytdl(song.url))
            .on('finish', () => {
                queue.songs.shift();
                play(queue.songs[0]);
            })
            .on('error', error => console.error(error));
        await dispatcher.setVolumeLogarithmic(queue.volume / 100);
        const embed02 = new Discord.MessageEmbed()
            .setDescription(`🎶 __**Start playing:**__\n${song.title}`)
            .setThumbnail(song.thumbnail)
            .addField(`Published by`, song.channel, true)
            .addField(`Published at`, moment.utc(song.publishedAt).format('Do MMMM YYYY'), true)
            .addField(`Duration`, `${song.durationH}h, ${song.durationM}m, ${song.durationS}s`, true)
            .addField(`ID`, `[${song.id}](${song.url})`, true)
            .addField(`Requested by`, `${message.author}`, true)
            .addField(`Current Volume`, `${queueConstruct.volume}%`, true)
            .setTimestamp();
        queue.textChannel.send({ embed: embed02 });
    };
    try {
        const connection = await channel.join();
        queueConstruct.connection = await connection;
        await play(queueConstruct.songs[0]);
    } catch (error) {
        await message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`I could not join the voice channel: ${error.message}`);
    }
};
module.exports.help = {
    Name: "Play",
    Aliases: ["play", "p"],
    Category: "Music",
    Permissions: ["None"],
    Usage: ["play [input]"],
    Description: "Plays music in your voice channel."
};