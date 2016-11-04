'use strict'

const masterbot = require('./lib/masterbot')

masterbot.init(err => {
  if (err) return console.log('[ERROR] init', err)
  return console.log('masterbot its alive!')
})
