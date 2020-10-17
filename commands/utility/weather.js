const Discord = require("discord.js");
const weather = require('weather-js');
module.exports.run = async (Client, message, args) => {
    if (!args[0]) return message.channel.send("You didn't input any location...");
    weather.find({ search: args.join(" "), degreeType: "C" }, function (error, result) {
        try {
            if (error) return message.channel.send(error.message);
            let current = result[0].current;
            let location = result[0].location;
            const currentWeather = new Discord.MessageEmbed()
                .setTitle(`${current.observationpoint} | ${location.name}`)
                .setThumbnail(current.imageUrl)
                .addField("Latitude & Longitude", `${location.lat} ${location.long} | [Open In Google Maps](https://www.google.com/maps/place/${location.lat}+${location.long})`)
                .addField("Time & Date", `${current.observationtime}, ${current.day}, ${current.date}`)
                .addField("Weather Alert?", `${location.alert ||  "No Alert"}`)
                .addField("Degree Type", location.degreeType)
                .addField("Temperature", current.temperature)
                .addField("Feels Like", current.feelslike)
                .addField("Himidity", current.humidity)
                .addField("Wind", current.winddisplay)
                .addField("Sky Text", current.skytext)
                .setTimestamp();
            return message.channel.send(currentWeather);
        } catch (error) {
            message.channel.send("An error occured...\n" + error.message);
        }
    });
}
module.exports.help = {
    Name: "Weather",
    Aliases: ["weather"],
    Category: "Utility",
    Permissions: ["None"],
    Usage: ["weather [location]"],
    Description: "Shows information about the weather for a specific location."
};