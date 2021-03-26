import { Request, Response, NextFunction } from 'express'
import { ServerLocals } from '@intf/Server'
import { LogTypes } from '../../props'

const getProcessingTimeInMS = (time: any): string => {
  return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
}

const excludedFromLogging = [
  '/_next',
  '/styles',
  '/app/',
  '/favicon'
]

export default (req: Request, res: Response, next: NextFunction): void => {
  const [oldEnd] = [res.end]
  const chunks: Buffer[] = []
  const _hrtime = process.hrtime()
  const { logger } = req.app.locals as ServerLocals

  // Request logging
  const blacklisted = excludedFromLogging.find((item: string) => req.url.indexOf(item) > -1)

  if (req.url && !blacklisted) {
    logger.info({
      type: LogTypes.request,
      message: `to ${req.url} via ${req.method}`,
      body: req.body
    })

    // Response logging
    // tslint:disable-next-line:only-arrow-functions
    res.end = function(chunk: any): void {
      if (chunk) {
        chunks.push(Buffer.from(chunk))
      }
      const body = Buffer.concat(chunks).toString('utf8')
      const eventTime = getProcessingTimeInMS(process.hrtime(_hrtime))
      logger.info({
        type: LogTypes.response,
        message: `${req.url} responsed in ${eventTime}`,
        body
      })
      oldEnd.apply(res, arguments)
    }
  }

  next()
}