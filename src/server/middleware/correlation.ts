import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'

import { ServerLocals } from '@intf/Server'

import { Headers } from '../../props'

export default (req: Request, res: Response, next: NextFunction): void => {
  const { logger } = req.app.locals as ServerLocals
  const correlation = uuid()
  logger.correlation = correlation
  req.app.locals.logger = logger
  req.app.locals.ip = res && res.req ? res.req.socket.remoteAddress : '0.0.0.0'
  res.header(Headers.XCorrelation, correlation)
  next()
}