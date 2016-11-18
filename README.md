# masterbot

[![Build Status](https://travis-ci.org/polybot-io/masterbot-node.svg?branch=master)](https://travis-ci.org/polybot-io/masterbot-node)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> A configurable chatbot for Telegram, Slack and Messenger via JSON file.

#### 🚧 Under development. Version 1.0.0 will be released soon. 🤓

## Usage

- [Clone](https://help.github.com/articles/cloning-a-repository/) this repo
- Run `$ yarn` or `$ npm i`
- Copy [polybot-test.sample.json](./polybot-test.sample.json) as `polybot-test.json`
- Run `$ node index.js`

## Deployment

masterbot was made to run with [now](https://github.com/zeit/now) (from first commit). So, you only need to to run:

```bash
$ now -e NODE_ENV=production
```

_or you can deploy as a common node app._

## Contribute

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Start making changes

As always, you can use `$ npm test` to run the tests and see if your changes have broken anything.
