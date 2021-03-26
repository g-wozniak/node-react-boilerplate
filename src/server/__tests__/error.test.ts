import ServerError from '../error'

/*
  Custom error testing
*/

describe('ServerError', () => {

  it('processes the custom error', () => {
    const msg = 'this is test'
    const e = new ServerError(400, msg)
    expect(e.code).toEqual(400)
    expect(e.name).toEqual('ServerError')
    expect(e.data).toEqual(undefined)
    expect(e.message).toEqual(msg)
    expect(e.getResponse()).toEqual({
      code: 400,
      message: msg
    })
  })

  it('gets response with custom data from the error', () => {
    const data = { test: 123 }
    const e = new ServerError(400, 'Test', data)
    expect(e.getResponse()).toEqual({
      code: 400,
      message: 'Test',
      data
    })
    expect(e.data).toEqual(data)
  })

})
