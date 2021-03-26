const request = require('supertest')
import { Response } from 'supertest'
import { System } from '@intf/Server'
import system from '../../server/system'


/*
  Application server startup tests.
  Verify if the server behaves as expected.
*/


describe('`Name` controller test', () => {

  let app: System

  beforeEach(async () => {
    app = await system()
  })

  afterEach(async () => {
    app && await app.closeAll()
  })

  it('inserting `name` is successful', async () => {
    await request(app.server)
      .post('/api/name')
      .send({
        name: 'Greg',
        surname: 'Woz'
      })
      .expect(200)
      .then(async () => {
        const name = app.collections.name()
        const res = await name.findOne({ name: 'Greg' })
        expect(res).toBeDefined()
      })
  })


  it('throws an error if _id is undefined', async () => {
    const spy = jest.spyOn(app.collections, 'name').mockReturnValue({
      ...app.collections.name(),
      insert: async () => { return undefined }
    })
    await request(app.server)
      .post('/api/name')
      .send({
        name: 'Greg',
        surname: 'Woz'
      })
      .expect(500)
      .then(async (resp: Response) => {
        expect(resp.body).toEqual({
          message: 'Database error'
        })
      })
    spy.mockRestore()
  })

})
