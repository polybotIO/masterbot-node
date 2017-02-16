// Packages
import request from 'request-promise-native'

// Ours
import pkg from '../../package'

class polybotApi {
  constructor(token) {
    if (!token) {
      console.error('No token found!')
    }

    this.request = request.defaults({
      baseUrl: 'https://api.polybot.io',
      timeout: 30000,
      json: true,
      headers: {
        'User-Agent': `Masterbot v${pkg.version}`,
        'X-POLYBOT-BOT-TOKEN': token
      }
    })
  }

  handleRequest(config, selector) {
    return new Promise((resolve, reject) => {
      this.request(config)
        .then(res => {
          const data = selector ? res[selector] : res
          resolve(data)
        })
        .catch(err => {
          let errData
          if (err.data && err.data.err) {
            errData = err.data.err
          } else if (err.data) {
            errData = err.data
          } else {
            errData = err.toString()
          }
          reject(errData)
        })
    })
  }

  getBot(bid) {
    return this.handleRequest({
      url: `/bots/${bid}`,
      method: 'get'
    })
  }

  setStatus(bid, status) {
    return this.handleRequest({
      url: `/bots/${bid}/status`,
      method: 'put',
      body: {
        status
      }
    })
  }
}

export default polybotApi
