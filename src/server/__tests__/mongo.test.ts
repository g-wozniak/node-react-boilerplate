import { Request, Response } from 'express'
const request = require('supertest')

import { ServerLocals, System } from '@intf/Server'
import { ApiEndpoint } from '@intf/Routes'

import system from '../system'
import { RequestMethods } from '../../props'
import { newConnectionString } from '../services/mongo/connector'


/*
  MongoDB service
  Testing the service behaviour and connector
*/

const endpoint: ApiEndpoint = {
  method: RequestMethods.GET,
  uri: '/test',
  binding: null
}

describe('MongoDB service', () => {

  let app: System

  afterEach(async () => app && await app.closeAll())

  it('mongo service exists in the route', async () => {
    let collections

    endpoint.binding = (req: Request, res: Response) => {
      const locals = req.app.locals as ServerLocals
      collections = locals.collections
      res.status(200).send()
    }

    app = await system({ endpoints: {
      'test': endpoint
    }})

    await request(app.server)
      .get('/test')
      .expect(200)

    expect(collections).toHaveProperty('name')
    expect(collections.name).toBeInstanceOf(Function)
  })


  it.todo('mongo public methods')

  describe('→ connector', () => {
    it('returns connection string', () => {
      const conn = {
        hostname: 'localhost',
        port: 27111,
        database: 'simply_careers_test',
        timeout: 10000
      }
      expect(newConnectionString(conn)).toEqual('mongodb://localhost:27111/simply_careers_test?connectTimeoutMS=10000&socketTimeoutMS=10000&keepAlive=true')
    })

    it.todo('mongo connector other methods')
  })

})
