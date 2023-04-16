import 'dotenv/config'
import axios from 'axios'
import { Client, IntentsBitField } from 'discord.js'

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
})

client.on('ready', () => {
  console.log('bot is on')
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  if (message.channel.id !== process.env.CHANNEL_ID) return

  let conversationLog = [{ role: 'system', content: 'You are a sarcastic chatbot.' }]
  
  conversationLog.push({
    role: 'user',
    content: message.content,
  })

  await message.channel.sendTyping()

  const baseUrl = 'https://c031-2804-29b8-5082-32d1-e4b2-d7c2-f820-fb62.ngrok-free.app/?'
  const endpoint = 'prompt='
  const userRequest = message.content

  const response = await axios.get(baseUrl + endpoint + userRequest)
  const { res } = response.data

  message.reply(res)

})

client.login(process.env.TOKEN)