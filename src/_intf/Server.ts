import { Server } from 'http'
import { ApiEndpoints } from './Routes'
import { MongoConnector } from './Services'

import { Collections } from '../api/collections'
import { LogLevels } from '../props'


import MongoService from '../server/services/mongo'
import Logger from '../server/logger'

export interface ServerArgs {
  port: string | number
  config: ServerEnvironment
  endpoints: ApiEndpoints
  collections: (service: MongoService) => Collections
}

export interface AppServer {
  server: Server
  collections: Collections // You can make it more generic if it bothers you tight coupling
  mongoConnector: MongoConnector
}
export interface SystemArgs {
  port?: string | number
  config?: SystemEnvironment
  endpoints?: ApiEndpoints
  prefill?: SystemDataPrefill
}

export interface SystemDataPrefill {}

export interface SystemEnvironment {
  environment?: string
  logging?: LogLevels[]
  distDir?: string
  webapp?: {
    compression: boolean
  }
}

export interface System {
  server: Server
  collections: Collections
  closeAll(): Promise<any[]>
}

export interface ServerEnvironment extends SystemEnvironment {
  environment: string
  logging: LogLevels[]
  distDir: string
  mongo: string
  purgeData?: boolean
  webapp: {
    compression: boolean
  }
}

export interface ServerLocals {
  logger: Logger
  collections: Collections
}

