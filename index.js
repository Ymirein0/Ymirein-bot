const { Client, GatewayIntentBits } = require("discord.js")
require ("dotenv").config()

const imgGen = require ("./imgGen")

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

const BoasVindasMD = "1025895863471579208" //ID do canal do Monarch's Domain

client.on("guildMemberAdd", async (member) => { //Quando um membro entra no servidor;
    const img = await imgGen(member)
    member.guild.channels.cache.get(BoasVindasMD).send({
        content:`<@${member.id}>, seja bem-vindo ao servidor!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)