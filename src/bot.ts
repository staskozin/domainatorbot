import TelegramBot from 'node-telegram-bot-api'
import db from './lib/db.js'

import getUser from './class/User.js'

const bot = new TelegramBot(process.env.BOT_TOKEN)

if (process.env.DEV_MODE) {
  await bot.deleteWebHook()
  await bot.startPolling()
} else {
  await bot.setWebHook(process.env.WEBHOOK_URL)
}

bot.on('message', async msg => {
  const user = await getUser(msg.chat.id)
  bot.sendMessage(user.id, user.id.toString())
  if (msg.text = '/reset') {
    await user.reset()
    bot.sendMessage(user.id, 'Бот перезагружен.')
  }
})

export default bot
