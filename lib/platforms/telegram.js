'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand

// Response action using Ping Example
class PingController extends TelegramBaseController {
  pingHandler ($) {
    $.sendMessage('pong')
  }

  get routes () {
    return {
      'pingCommand': 'pingHandler'
    }
  }
}

class OtherwiseController extends TelegramBaseController {
  handle () {
    console.log('otherwise')
  }
}

exports.init = (auth, settings) => {
  const tg = new Telegram.Telegram(auth.token)

  settings.forEach(setting => {
    if (setting.action === 'response') {
      tg.router
        .when(new TextCommand(setting.command, 'pingCommand'), new PingController(setting.response))

      if (setting.default) {
        tg.router
          .otherwise(new OtherwiseController(setting.default))
      }
    }
  })
}
