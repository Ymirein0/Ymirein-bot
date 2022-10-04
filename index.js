const { Client, GatewayIntentBits } = require("discord.js")
require ("dotenv").config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    ]
})

client.on("ready",  () => {
    console.log(`${client.user.tag} está no ar!`)
})

client.on("messageCreate", (message) => {
    if (message.content == "Ping!"){
        message.reply("Pong!")
    }
})

client.login(process.dotenv.TOKEN)