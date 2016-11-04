'use strict'

const path = require('path')
const rootPath = path.normalize(__dirname + '/../..')

module.exports = {
  root: rootPath,
  port: process.env.PORT || 5000
}
