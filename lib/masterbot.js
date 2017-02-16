// Native
import {resolve} from 'path'

// Ours
import config from '../config/env'
import polybotApi from './helpers/polybot-api'

// Methods
function init() {
  if (config.env === 'development') {
    const botPath = resolve(config.root, 'polybot-test.json')
    const testBot = require(botPath)

    return boot(testBot)
  }

  const bid = config.botId
  const token = config.botToken

  if (!bid || !token) {
    return console.error('[ERROR] init: BOT_ID and BOT_TOKEN are required')
  }

  const polybot = polybotApi(token)

  polybot.getBot(bid)
    .then(bot => {
      return boot(bot)
    })
    .catch(err => {
      console.error('[ERROR] getBot', err)
    })
}

function boot(bot) {
  if (!Array.isArray(bot.engines)) {
    return console.error('[ERROR] boot: Invalid engines')
  }

  const platforms = {}

  bot.engines.forEach(engine => {
    const platform = engine.platform
    const engineAuth = engine.auth
    const allSettings = bot.settings.all
    let platformSettings = bot.settings[platform]

    console.error(`[INFO] boot: loading platform ${platform}`)

    if (!engineAuth) {
      return console.error(`[ERROR] boot: Auth required for platform ${platform}`)
    }

    if (!Array.isArray(platformSettings)) {
      return console.error(`[ERROR] boot: Invalid settings for platform ${platform}`)
    }

    if (platformSettings.length === 0) {
      return console.error(`[INFO] boot: Empty settings for platform ${platform}`)
    }

    if (allSettings) {
      if (!Array.isArray(allSettings)) {
        return console.error('[ERROR] boot: Invalid "all" settings')
      }

      platformSettings = allSettings.concat(platformSettings)
    }

    // Init enabled platforms
    platforms[platform] = require(`./platforms/${platform}`).default
    platforms[platform].init(engineAuth, platformSettings)
  })
}

export default {init, boot}
