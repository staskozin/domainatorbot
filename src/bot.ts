import TelegramBot from 'node-telegram-bot-api'

import getUser from './model/user.js'
import Domains from './model/domain.js'

const bot = new TelegramBot(process.env.BOT_TOKEN)

if (process.env.DEV_MODE) {
  await bot.deleteWebHook()
  await bot.startPolling()
} else {
  await bot.setWebHook(process.env.WEBHOOK_URL)
}

bot.on('message', async msg => {
  const user = await getUser(msg.chat.id)

  // Если ждем ввода домена
  if (user.isAddingDomain) {
    await user.setIsAddingDomain(false)
    
    // TODO: Передать сообщение пользователя в функцию, добавляющую домен
    // Если домен уже есть, сообщить об этом
    const domain = await Domains.getDomain(msg.text.toLocaleLowerCase())

    // Сообщить о результате
    await bot.sendMessage(user.id, domain !== null ? `Домен ${domain.name} добавлен\nОкончание: ${domain.expires}` : 'Домен не найден')
    return
  }

  // Первый запуск
  if (msg.text === '/start') {
    await bot.sendMessage(user.id, 'Приветствие.')
    return
  }

  // Перезагрузка бота
  if (msg.text === '/reset') {
    await user.reset()
    await bot.sendMessage(user.id, 'Бот перезагружен.')
    return
  }

  // TODO: Добавление домена
  if (msg.text === '/add') {
    await bot.sendMessage(user.id, 'Введите доменное имя.')
    await user.setIsAddingDomain(true)
    return
  }

  // TODO: Удаление домена
  if (msg.text === '/delete') {
    await bot.sendMessage(user.id, 'Удаление домена.')
    return
  }

  // TODO: Список доменов
  if (msg.text === '/list') {
    await bot.sendMessage(user.id, 'Список доменов пользователя.')
    return
  }

  await bot.sendMessage(user.id, 'Неизвестная команда.')
})

export default bot
