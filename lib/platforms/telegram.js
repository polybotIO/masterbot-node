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
    if (setting.module === 'response') {
      bot.on('text', msg => {
        const response = (setting.input === msg.text) ? setting.response : setting.default
        bot.sendMessage(msg.from.id, response)
      })
    }
  })

  bot.connect()
}

export default {init}
