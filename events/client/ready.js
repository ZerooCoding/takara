const config = require(`../../config.json`);
function setPresence(Client, count) {
    const status = [
        "on $GUILDS guilds",
        "$USER member",
        "in $CHANNEL channels"
    ];
    const index = Math.floor(Math.random() * (status.length - 1) + 1);
    const game = status[index]
        .replace("$USER", count)
        .replace("$GUILDS", Client.guilds.cache.size)
        .replace("$CHANNEL", Client.channels.cache.size);
    Client.user.setPresence({
        activity: {
            type: "STREAMING",
            url: "https://www.twitch.tv/DieKommunikation",
            name: `${game} | ${config.DEFAULT_PREFIX}help | V:${config.VERSION}`
        },
        status: "online"
    });
}
module.exports = async Client => {
    let count = 0;
    Client.guilds.cache.forEach(guild => {
        count += guild.memberCount;
    });
    Client.user.setPresence({
        activity: {
            name: `Starting | V: ${config.VERSION}`
        },
        status: "dnd"
    });
    setInterval(() => {
        setPresence(Client, count);
    }, 15000);
    console.log(Client.user.tag);
}
