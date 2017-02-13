// Native
import {resolve} from 'path'

// Ours
import config from '../../config/env'

const botPath = resolve(config.root, 'polybot-test.json')
const bot = require(botPath)

export default bot
