'use strict'

const request = require('request')
const utils = require('./utils')

const config = utils.loadConfig()
const pkg = utils.loadPkg()

// validate settings and bootstrap bots
const boot = bot => {
  if (!Array.isArray(bot.engines)) return console.log('[ERROR] boot: Invalid engines')

  let platforms = {}

  bot.engines.forEach(engine => {
    const platform = engine.platform

    console.log('[INFO] boot: loading platform ' + platform)

    if (!Array.isArray(bot.settings[platform])) return console.log('[ERROR] boot: Invalid settings for platform ' + platform)
    if (bot.settings[platform].length === 0) return console.log('[INFO] boot: Empty settings for platform ' + platform)

    let allSettings = bot.settings.all
    let platformSettings = bot.settings[platform]

    if (allSettings) {
      if (!Array.isArray(allSettings)) return console.log('[ERROR] boot: Invalid "all" settings')
      platformSettings = allSettings.concat(platformSettings)
    }

    // Init enabled platforms
    platforms[platform] = require('./platforms/' + platform)
    platforms[platform].init(engine.auth, platformSettings)
  })
}

exports.init = _ => {
  if (process.env.NODE_ENV !== 'development' || (config.token && config.bid)) {
    const bid = process.env.POLY_BID || config.bid
    const token = process.env.POLY_TOKEN || config.token

    let options = {
      url: 'https://api.polybot.io/bots/' + bid,
      headers: {
        'User-Agent': 'Masterbot v' + pkg.version,
        'X-POLYBOT-ACCESS-TOKEN': token
      }
    }

    request(options, (err, res, bot) => {
      if (err) return console.log('[ERROR] init', err)
      return boot(bot)
    })
  } else {
    let bot = utils.loadTestBot()
    return boot(bot)
  }
}
