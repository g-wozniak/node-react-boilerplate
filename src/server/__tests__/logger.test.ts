import Logger, { extract } from '../logger'
import { LogLevels, LogTypes } from '../../props'

/*
  Logging module testing
  TODO: enhance with streams check of stdio
*/

describe('Logger', () => {

  const console = jest.spyOn(global.console, 'info').mockImplementation()
  afterEach(() => console.mockReset())

  describe('→ info', () => {
  
    it('displays info', () => {
      const logger = new Logger([LogLevels.info])
      logger.info({ message: 'test' })
      expect(console).toHaveBeenCalled()
    })
  
    it('does not log info regardless of being told', () => {
      const logger = new Logger()
      logger.info({ message: 'test' })
      expect(console).not.toHaveBeenCalled()
    })

    it('displays info with custom type', () => {
      const logger = new Logger([LogLevels.info])
      logger.info({ message: 'test', type: LogTypes.request })
      expect(console).toHaveBeenCalled()
    })

    it('displays info with a body', () => {
      const logger = new Logger([LogLevels.info])
      logger.info({ message: 'test', type: LogTypes.request, body: { some: 'thing' } })
      expect(console).toHaveBeenCalled()
    })
  })
  
  describe('→ error', () => {
    it('displays error', () => {
      const logger = new Logger([LogLevels.error])
      logger.error({ message: 'test' })
      expect(console).toHaveBeenCalled()
    })

    it('displays error with stack', () => {
      const logger = new Logger([LogLevels.error])
      logger.error({ message: 'test', stack: 'somestack' })
      expect(console).toHaveBeenCalled()
    })

    it('does not log error regardless of being told', () => {
      const logger = new Logger()
      logger.error({ message: 'test' })
      expect(console).not.toHaveBeenCalled()
    })
  })

  describe('→ warning', () => {
    it('displays warning', () => {
      const logger = new Logger([LogLevels.warning])
      logger.warning({ message: 'test' })
      expect(console).toHaveBeenCalled()
    })

    it('does not log warning regardless of being told', () => {
      const logger = new Logger([LogLevels.error])
      logger.warning({ message: 'test' })
      expect(console).not.toHaveBeenCalled()
    })
  })

  it('uses `stash` writer', () => {
    const logger = new Logger([LogLevels.info], 'stash')
    logger.info({ message: 'test' })
    expect(console).toHaveBeenCalled()
  })

  describe('→ extract', () => {

    it('extract json to string', () => {
      expect(extract({ test: '123' })).toEqual('{"test":"123"}')
    })

    it('extract a string to string', () => {
      expect(extract('test')).toEqual('test')
    })

    it('extract an array to string', () => {
      expect(extract(['test', 'two'])).toEqual('test, two')
    })

    it('if empty then nothing returned', () => {
      expect(extract()).toBeUndefined()
    })
    
  })
})
