const path = require('path')

import { ServerEnvironment } from '@intf/Server'
import { LogLevels } from './props'
import { connectionStringFromVariable, newConnectionString } from './server/services/mongo/connector'

const environment = process.env.NODE_ENV || 'dev'

let conn = process.env.MONGO_DB_CONNECTION
if (!conn) {
  conn = newConnectionString({
    database: 'simply_careers_dev',
    hostname: 'localhost',
    port: 27017,
    timeout: 10000
  })
} else {
  conn = connectionStringFromVariable(conn)
}

const config: ServerEnvironment[] = [
  {
    environment: 'dev',
    mongo: conn,
    logging: [LogLevels.warning, LogLevels.error, LogLevels.info],
    distDir: './dist',
    purgeData: true,
    webapp: {
      compression: false
    }
  },
  {
    environment: 'prod',
    mongo: conn,
    logging: [LogLevels.warning, LogLevels.error, LogLevels.info],
    distDir: path.resolve(__dirname, process.env.DIST_DIR || '..'),
    webapp: {
      compression: true
    }
  }
]

const thisConfig = config.find((cfg: ServerEnvironment) => cfg.environment === environment)

export default thisConfig
