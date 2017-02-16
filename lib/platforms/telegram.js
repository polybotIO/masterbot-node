import Telebot from 'telebot'

function init(auth, settings) {
  const bot = new Telebot(auth.token)

  bot.on('connect', () => {
    console.log('[Telegram] connected')
  })

  bot.on('disconnect', () => {
    console.log('[Telegram] disconnected')
  })

  // Settings
  settings.forEach(setting => {
    bot.on('text', msg => {
      // Module response
      if (setting.module === 'response') {
        const response = (setting.input === msg.text) ? setting.response : setting.default
        bot.sendMessage(msg.from.id, response)
      }

      // Module sendPhoto
      if (setting.module === 'sendPhoto') {
        if (setting.input === msg.text) {
          bot.sendPhoto(msg.from.id, 'https://beerpay.io/files/a96fcfe5c44df5d6d0d5584063759b74.jpg')
        }
      }
    })
  })

  bot.connect()
}

export default {init}
