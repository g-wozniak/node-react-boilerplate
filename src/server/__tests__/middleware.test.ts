import * as uuid from 'uuid'

import system from '../system'
const request = require('supertest')

import { Headers } from '../../props'
import { System } from '@intf/Server'

jest.mock('uuid')

/*
  Application server startup tests.
  Verify if the server behaves as expected.
*/

describe('Server middleware', () => {

  describe('→ correlation', () => {

    let app: System

    afterEach(async () => app && await app.closeAll())

    it('returns correlation header', async () => {
      const spy = jest.spyOn(uuid, 'v4').mockReturnValue('1234')
      app = await system()
      await request(app.server)
        .get('/test')
        .expect(200)
        .then((resp) => {
          expect(resp.headers).toHaveProperty([Headers.XCorrelation])
          expect(resp.headers[Headers.XCorrelation]).toEqual('1234')
        })
      spy.mockReset()
    })

  })

})
