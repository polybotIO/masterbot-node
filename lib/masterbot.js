'use strict'

const request = require('request')
const utils = require('./utils')

const config = utils.loadConfig()
const pkg = utils.loadPkg()

// validate settings and bootstrap bots
const boot = settings => {
  if (!Array.isArray(settings.engines)) return console.log('[ERROR] Invalid engines')

  let platforms = {}

  settings.engines.forEach(engine => {
    let platform = engine.platform

    if (!Array.isArray(settings.actions[platform])) return console.log('[ERROR] Invalid actions for platform ' + platform)
    if (settings.actions[platform].length === 0) return console.log('[INFO] Empty actions for platform ' + platform)

    platforms[platform] = require('./platforms/' + platform)
    platforms[platform].init(engine.auth, settings.actions[platform])
  })
}

exports.init = callback => {
  if (process.env.NODE_ENV !== 'development' || config.token) {
    let token = process.env.POLY_TOKEN || config.token

    let options = {
      url: 'https://api.polybot.io/bots/settings',
      headers: {
        'User-Agent': 'Masterbot v' + pkg.version,
        'X-POLYBOT-ACCESS-TOKEN': token
      }
    }

    request(options, (err, res, settings) => {
      if (err) return callback(err)
      if (res.statusCode === 200) callback()

      return boot(settings)
    })
  } else {
    let settings = utils.loadTestBot()
    return boot(settings)
  }
}
