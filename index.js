const { Client, GatewayIntentBits } = require("discord.js")
require ("dotenv").config()

const imgGen = require("./imgGen")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
	    GatewayIntentBits.GuildMembers
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

const BoasVindasMD = "1025895863471579208"

client.on("guildMemberAdd", async (member) => {
    const img = await imgGen(member)
    member.guild.channels.cache.get(BoasVindasMD).send({
        content: `<@${member.id}>, seja bem-vindo!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)