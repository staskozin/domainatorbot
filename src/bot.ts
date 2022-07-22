import TelegramBot from 'node-telegram-bot-api'
import db from './lib/db.js'

const bot = new TelegramBot(process.env.BOT_TOKEN)

if (process.env.DEV_MODE) {
  await bot.deleteWebHook()
  await bot.startPolling()
} else {
  await bot.setWebHook(process.env.WEBHOOK_URL)
}

bot.on('message', async msg => {
  const domain: Domain[] = (await db.query('SELECT * FROM domain')).rows
  bot.sendMessage(msg.chat.id, `${domain[0].domain_name} — ${domain[0].expires}`)
})

export default bot

type Domain = {
  domain_name: string,
  registrar?: string,
  expires?: Date,
  deletion?: Date
}
