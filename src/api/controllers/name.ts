import { Request, Response, NextFunction } from 'express'
import { ServerLocals } from '@intf/Server'

import ServerError from '../../server/error'


export const insert = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { collections } = req.app.locals as ServerLocals
  const { name, surname } = req.body
  const repo = collections.name()
  const _id = await repo.insert({
    name,
    surname
  })

  if (!_id) {
    return next(new ServerError(500, 'Database error'))
  }

  return res.status(200).json({
    _id
  })
  

}
