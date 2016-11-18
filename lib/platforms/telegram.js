'use strict'

const Telebot = require('telebot')

exports.init = (auth, settings) => {
  const bot = new Telebot(auth.token)

  settings.forEach(setting => {
    if (setting.type === 'response') {
      bot.on('text', (msg) => {
        const response = (setting.input === msg.text) ? setting.response : setting.default
        bot.sendMessage(msg.from.id, response)
      })
    }
  })

  bot.connect()
}
