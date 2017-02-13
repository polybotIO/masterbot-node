// Packages
import Botkit from 'botkit'

const controller = Botkit.slackbot()

function init(auth, settings) {
  const bot = controller.spawn({token: auth.token})

  bot.startRTM(err => {
    if (err) {
      console.log('[ERROR] Slack: Could not connect', err)
    }
  })

  settings.forEach(setting => {
    if (setting.module === 'response') {
      controller.hears(setting.input, 'direct_message,direct_mention,mention', (bot, message) => {
        bot.reply(message, setting.response)
      })
    }
  })
}

export default {init}
