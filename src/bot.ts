import TelegramBot from 'node-telegram-bot-api'

const bot = new TelegramBot(process.env.BOT_TOKEN)

if (process.env.DEV_MODE) {
  await bot.deleteWebHook()
  await bot.startPolling()
} else {
  await bot.setWebHook(process.env.WEBHOOK_URL)
}

bot.on('message', async msg => {
  bot.sendMessage(msg.chat.id, 'Hello')
})

export default bot