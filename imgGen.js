const Canvas = require ("canvas")
const Discord = require ("discord.js")

const background = "https://i.imgur.com/zvWTUVu.png"

//dimensões do background
const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const avat = {
    size: 256,
    x: 480,
    y: 170
}

const imgGen = async (member) => {
    let username = member.user.username // nick
    let discriminator = member.user.discriminator // os 4 digitos após o nick
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: avat.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d") // p começar a desenhar e facilitar os próximos comandos

    // desenhando no background que definimos lá em cima
    const backImg = await Canvas.loadImage(background)
    ctx.drawImage(backImg, 0, 0)

    // criando um quadrado preto
    ctx.fillStyle = "rgba(0,0,0,0.8)" //0,0,0 = preto ; 0.8 = transparência
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avatImg = await Canvas.loadImage(avatarURL)
    ctx.save()

    // começando o arco p fazer o avatar ficar redondinho
    ctx.beginPath()
    ctx.arc(avat.x + avat.size / 2, avat.y + avat.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatImg, avat.x, avat.y)
    ctx.restore()

    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = imgGen