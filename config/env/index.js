// Native
import {join} from 'path'

// Ours
const envs = ['development', 'test', 'production']
const defaults = {
  root: join(__dirname, '/../../')
}

let env = process.env.NODE_ENV || 'development'

if (envs.indexOf(env) === -1) {
  env = 'development'
}

// load configs
const config = require(`./${env}`)

export default Object.assign(defaults, config.default)
