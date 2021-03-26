import { Request, Response as ExpressResponse, NextFunction } from 'express'
const reachable = require('is-port-reachable')
const request = require('supertest')
import { Response } from 'supertest'

import { System } from '@intf/Server'
import { ApiEndpoint } from '@intf/Routes'

import system from '../system'
import ServerError from '../error'
import { RequestMethods } from '../../props'


/*
  Application server startup tests.
  Verify if the server behaves as expected.
*/

const msg = 'This is a message'

const endpoint: ApiEndpoint = {
  method: RequestMethods.GET,
  uri: '/test',
  binding: null
}

describe('Server', () => {

  let app: System

  afterEach(async () => app && await app.closeAll())

  it('starts the server under a custom port', async () => {
    const port = 3131
    app = await system({ port })
    const status = reachable(port, { host: `localhost:${port}` })
    expect(status).toBeTruthy()
  })

  it('returns custom error', async () => {
    endpoint.binding = (req: Request, res: ExpressResponse, next: NextFunction) => {
      next(new ServerError(400, msg))
    }

    app = await system({ endpoints: {
      'test': endpoint
    }})

    await request(app.server)
      .get('/test')
      .expect(400)
      .then(async (resp: Response) => {
        expect(resp.body).toEqual({ message: msg })
      })
  })

  it('returns custom error with data', async () => {
    endpoint.binding = (req: Request, res: ExpressResponse, next: NextFunction) => {
      next(new ServerError(400, msg, { test: 123 }))
    }

    app = await system({ endpoints: {
      'test': endpoint
    }})

    await request(app.server)
      .get('/test')
      .expect(400)
      .then(async (resp: Response) => {
        expect(resp.body).toEqual({
          message: msg,
          data: { test: 123 }
        })
      })
  })

})
