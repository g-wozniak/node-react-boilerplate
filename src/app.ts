require('module-alias/register')

import server from './server/server'
import config from './config'

import { AppServer } from '@intf/Server'

import endpoints from './api/endpoints'
import collections from './api/collections'

if (!config) {
  throw new Error(`Critical! No configuration for '${process.env.NODE_ENV}'`)
}

const events = ['SIGINT', 'SIGTERM', 'exit']

const port = process.env.PORT || 3000

server({ port, config, endpoints, collections }).then((app: AppServer) => {
  events.forEach((e: string) => {
    process.on(e, () => {
      app.server && app.server.close()
      app.mongoConnector.stop()
      console.info(`\nHandling signal '${e}' ...\n`)
      process.exit()
    })
  })
})
