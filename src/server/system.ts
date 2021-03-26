import { ServerEnvironment, System, SystemArgs } from '@intf/Server'
import * as _ from 'lodash'
const path = require('path')

import _endpoints from '../api/endpoints'
import collections from '../api/collections'

import server from './server'
import mongoSimulator from './services/mongo/simulator'

const _config: ServerEnvironment = {
  environment: 'test',
  distDir: path.resolve(__dirname, '..', '..', 'dist'),
  logging: [],
  mongo: '',
  webapp: {
    compression: false
  }
}

export default async (args: SystemArgs = {}): Promise<System> => {
  let config = _config
  let port = args.port

  if (args && args.config) {
    
    config = _.extend(_config, args.config)
  }

  if (!port) {
    port = _.random(10000, 19999)
  }

  const endpoints = args.endpoints || _endpoints

  const dbh = await mongoSimulator()

  config.mongo =  dbh.connectionString

  const app = await server({
    port,
    config,
    collections,
    endpoints
  })

  const closeAll = (): Promise<any[]> => Promise.all([
    app.mongoConnector.stop(),
    dbh.stop(),
    app.server.close()
  ])

  return {
    server: app.server,
    collections: app.collections,
    closeAll: () => closeAll(),
  }
}
