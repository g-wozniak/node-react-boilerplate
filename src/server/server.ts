const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const expressStaticGzip = require('express-static-gzip')

import { AppServer, ServerArgs, ServerLocals } from '@intf/Server'
import { MongoConnector } from '@intf/Services'



import Logger from './logger'

import errors from './middleware/errors'
import correlation from './middleware/correlation'
import logTraffic from './middleware/logTraffic'

import { LogTypes } from '../props'

import { connect } from './services/mongo/connector'
import MongoService from './services/mongo'


const gzipOptions = {
  enableBrotli: true,
  customCompressions: [{
      encodingName: 'deflate',
      fileExtension: 'zz'
  }],
  orderPreference: ['br']
}

const server = async ({ port, config, endpoints, collections }: ServerArgs): Promise<AppServer> => {

  let mongoConnector: MongoConnector

  const logger = new Logger(config.logging)

  const { webapp } = config

  const app = express()

  app.use(express.json())

  app.use(express.urlencoded({ extended: false }))

  app.use(helmet())

  app.use(cors())

  app.use(correlation)

  app.use(logTraffic)

  // app.use(language)

  // app.use(authentication)


  const webAppPath = path.resolve(config.distDir, 'build', 'webapp')

  const webAppIndexPath = webAppPath + '/index.html'

  if (!fs.existsSync(webAppIndexPath)) {
    const message = `Web application cannot be found at ${webAppIndexPath}. Are you sure it's traspiled?`
    logger.error({ message })
    throw new Error(message)
  }

  const publicDir = path.resolve(config.distDir, 'public')
  const webAppDir = `${webAppPath}/app`
  const stylesDir = `${publicDir}/styles`
  const assetsDir = `${publicDir}/assets`

  app.use('/app', !webapp.compression
    ? express.static(webAppDir)
    : expressStaticGzip(webAppDir, gzipOptions))

  app.use('/assets', !webapp.compression
    ? express.static(assetsDir)
    : expressStaticGzip(assetsDir, gzipOptions))

  app.use('/styles', !webapp.compression
    ? express.static(stylesDir)
    : expressStaticGzip(stylesDir, gzipOptions))

  const routesMapping: string[] = []

  for (const routeId in endpoints) {
    try {
      const route = endpoints[routeId]
      const method = route.method.toString()
      const { binding } = endpoints[routeId]
      app.route(route.uri)[method.toLowerCase()](binding)
      routesMapping.push(`-= Route '${routeId}' mapped to '${route.uri}' (${route.method})\n`)
    } catch (e) {
      const message = `Route initialisation failed: ${routeId}`
      logger.error({ message, stack: e.stack })
      console.error(e.stack)
      throw new Error(message)
    }
  }

  app.get('*', (req, res) => {
    res.sendFile(webAppIndexPath)
  })
  
  app.use(errors)

  try {
    mongoConnector = await connect(config.mongo)
  } catch (err) {
    logger.error({ message: err.message, stack: err.stack })
    throw new Error(err)
  }

  const mongoService = new MongoService(mongoConnector.mongoose, logger)
  if (config.purgeData) {
    await mongoService.dropAll()
  }

  const _collections = collections(mongoService)

  app.locals = {
    logger,
    collections: _collections
  } as ServerLocals

  const listener = app.listen(port, () => {
    logger.info({
      type: LogTypes.startup,
      message: `
_-=-__-=-__-=-__-=-__-=-__-=-__-=-__-=-__-=-__-=-__-=-__

 Server is listening on port: ${port}\n\n
  -= Assets compression: ${webapp.compression ? 'enabled' : 'disabled'}\n
  -= Web application index: ${webAppIndexPath}\n
  -= Web application directory mapping: ${webAppDir} to /app\n
  -= Images directory mapping: ${assetsDir} to /assets\n
  -= Styles directory mapping: ${stylesDir} to /styles\n
  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-\n
  -= Database connected: ${config.mongo.substring(0, 24)}...\n
  -= Database purge upon start: ${!!config.purgeData}\n
  -= Linked collections: ${Object.keys(_collections)}\n
  ${routesMapping.map((log: string) => log)}

_-=-__-=-__-=-__-=-__-=-__-=-__-=-__-=-__-=-__-=-__-=-__
`
    })
  })

  return {
    server: listener,
    collections: _collections, 
    mongoConnector
  }
}

export default server


  /*
    app.locals = {
    hostname: `${process.env.HOSTNAME || 'http://localhost'}:${port}`,
    logger,
    mongoose,
    secrets: {
      jwt: process.env.SECRET_JWT || 'IEEEStd1003.12013Edition[POSIX.1]',
      sendgrid: process.env.SECRET_SENDGRID_APIKEY || '',
      services: {
        emailGenerator: process.env.SECRET_SERVICE_EMAIL || basicAuthToken('6012ea53004cd63644f616d26012ea7a4940077206a5eb05'),
        pdfGenerator: process.env.SECRET_SERVICE_PDF || basicAuthToken('6012ea8f02fbc268ffddf2556012ea95a1df653374002f21')
      }
    }
  } as IServerLocals

*/
