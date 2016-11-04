'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// Load configurations
exports.loadConfig = _ => {
  let configPath = process.cwd() + '/config/env'
  let configAll = require(configPath + '/all')
  let envName = (process.env.NODE_ENV || 'development')
  let envFile = envName + '.js'

  // Set the node environment variable if not set before
  process.env.NODE_ENV = ~fs.readdirSync(configPath).indexOf(envFile) ? envName : 'development'

  let configFile = path.join(configPath, envFile)
  let configEnv = require(configFile) || {}

  // Extend the base config in all.js with the enviroment configuration file
  Object.keys(configEnv).forEach(key => {
    configAll[key] = configEnv[key]
  })

  return configAll
}

// Load package.json info
exports.loadPkg = _ => {
  let pkgPath = process.cwd() + '/package.json'
  let pkg = require(pkgPath)

  return pkg
}

// Load Test Bot
exports.loadTestBot = _ => {
  let botPath = process.cwd() + '/polybot-test.json'
  let bot = require(botPath)

  return bot
}

// Generate token
exports.getToken = (bytes, type) => {
  let thisBytes = bytes || 16
  let thisType = type || 'hex'

  return crypto.randomBytes(thisBytes).toString(thisType)
}
