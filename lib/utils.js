'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// Load configurations
exports.loadConfig = _ => {
  const configPath = process.cwd() + '/config/env'
  const configAll = require(configPath + '/all')
  const envName = (process.env.NODE_ENV || 'development')
  const envFile = envName + '.js'

  // Set the node environment variable if not set before
  process.env.NODE_ENV = ~fs.readdirSync(configPath).indexOf(envFile) ? envName : 'development'

  const configFile = path.join(configPath, envFile)
  const configEnv = require(configFile) || {}

  // Extend the base config in all.js with the enviroment configuration file
  Object.keys(configEnv).forEach(key => {
    configAll[key] = configEnv[key]
  })

  return configAll
}

// Load package.json info
exports.loadPkg = _ => {
  const pkgPath = process.cwd() + '/package.json'
  const pkg = require(pkgPath)

  return pkg
}

// Load Test Bot
exports.loadTestBot = _ => {
  const botPath = process.cwd() + '/polybot-test.json' // TODO: check if exists before require
  const bot = require(botPath)

  return bot
}

// Generate token
exports.getToken = (bytes, type) => {
  const thisBytes = bytes || 16
  const thisType = type || 'hex'

  return crypto.randomBytes(thisBytes).toString(thisType)
}
