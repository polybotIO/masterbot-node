'use strict'

const Botkit = require('botkit')
const controller = Botkit.slackbot()

exports.init = (auth, settings) => {
  let bot = controller.spawn({ token: auth.token })

  bot.startRTM(err => {
    if (err) console.log('[ERROR] Slack: Could not connect')
  })

  settings.forEach(setting => {
    if (setting.action === 'response') {
      controller.hears([setting.command], 'direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(message, setting.response)
      })
    }
  })
}
