import TelegramBot from 'node-telegram-bot-api'

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

  // Первый запуск
  if (msg.text === '/start') {
    bot.sendMessage(user.id, 'Приветствие.')
  }

  // Перезагрузка бота
  if (msg.text === '/reset') {
    await user.reset()
    bot.sendMessage(user.id, 'Бот перезагружен.')
  }

  // TODO: Добавление домена
  if (msg.text === '/add') {
    bot.sendMessage(user.id, 'Добавление домена.')
  }

  // TODO: Удаление домена
  if (msg.text === '/delete') {
    bot.sendMessage(user.id, 'Удаление домена.')
  }

  // TODO: Список доменов
  if (msg.text === '/list') {
    bot.sendMessage(user.id, 'Список доменов пользователя.')
  }
})

export default bot
