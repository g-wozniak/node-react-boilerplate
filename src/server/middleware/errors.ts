import { NextFunction, Request, Response } from 'express'
import ServerError from '../error'
import { ServerLocals } from '@intf/Server'
import { JsonResponse } from '@intf/Request'

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const { logger } = req.app.locals as ServerLocals

  if (err instanceof ServerError) {

    const errorResponse = err.getResponse()
    logger.error({
      message: errorResponse.message,
      stack: err.stack
    })

    const r: JsonResponse = {
      message: errorResponse.message
    }

    if (errorResponse.data) {
      r.data = errorResponse.data
    }

    res.status(errorResponse['code']).json(r)
  } else {
    logger.error({ message: 'unknown', stack: err.stack })
    res.status(500).json({})
  }
}