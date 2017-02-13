// Packages
import request from 'request'

// Ours
import config from '../config/env'
import pkg from '../package'
import testBot from './helpers/testbot'

// Methods
function init() {
  if (config.env === 'development') {
    return boot(testBot)
  }

  const bid = config.botId
  const token = config.botToken

  if (!bid || !token) {
    return console.log('[ERROR] init: BOT_ID and BOT_TOKEN are required')
  }

  const options = {
    url: `https://api.polybot.io/bots/${bid}`,
    headers: {
      'User-Agent': `Masterbot v${pkg.version}`,
      'X-POLYBOT-BOT-TOKEN': token
    }
  }

  request(options, (err, res, bot) => {
    if (err) {
      return console.log('[ERROR] init:', err)
    }

    return boot(bot)
  })
}

function boot(bot) {
  if (!Array.isArray(bot.engines)) {
    return console.log('[ERROR] boot: Invalid engines')
  }

  const platforms = {}

  bot.engines.forEach(engine => {
    const platform = engine.platform
    const engineAuth = engine.auth
    const allSettings = bot.settings.all
    let platformSettings = bot.settings[platform]

    console.log(`[INFO] boot: loading platform ${platform}`)

    if (!engineAuth) {
      return console.log(`[ERROR] boot: Auth required for platform ${platform}`)
    }

    if (!Array.isArray(platformSettings)) {
      return console.log(`[ERROR] boot: Invalid settings for platform ${platform}`)
    }

    if (platformSettings.length === 0) {
      return console.log(`[INFO] boot: Empty settings for platform ${platform}`)
    }

    if (allSettings) {
      if (!Array.isArray(allSettings)) {
        return console.log('[ERROR] boot: Invalid "all" settings')
      }

      platformSettings = allSettings.concat(platformSettings)
    }

    // Init enabled platforms
    platforms[platform] = require(`./platforms/${platform}`)
    platforms[platform].default.init(engineAuth, platformSettings)
  })
}

export default {init, boot}
