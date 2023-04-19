import 'dotenv/config'
import { keepAlive } from './server.js'
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
  console.log('listening')
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  if (message.channel.id !== process.env.CHANNEL_ID_TEST) return
  if (message.channel.id !== process.env.CHANNEL_ID) return
  if (message.content.includes("!gpt")) {
    let conversationLog = [{ role: 'system', content: 'You are a sarcastic chatbot.' }]
  
    conversationLog.push({
      role: 'user',
      content: message.content,
    })
    
    await message.channel.sendTyping()
  
    const baseUrl = process.env.GPT_API_URL
    const endpoint = '?prompt='
    const userPrompt = message.content.replace('!gpt ', '')
    const urlFormatPrompt = userPrompt.replaceAll(' ', '+')
    const apiRequestUrl = baseUrl + endpoint + urlFormatPrompt
    const response = await axios.get(apiRequestUrl)
    const { res } = response.data
  
    message.reply(res);
  }
})

keepAlive()
client.login(process.env.TOKEN)