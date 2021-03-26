import * as chalk from 'chalk'
import * as _ from 'lodash'
import { v4 as uuid } from 'uuid'

import { WarningLog, ErrorLog, InfoLog, Log } from '@intf/Logger'
import { LogLevels } from '../props'

type Writer = 'console' | 'stash'

const colors = {}
colors[LogLevels.error] = (str: string) => chalk.white(chalk.bgRed(` ${str} `))
colors[LogLevels.info] = (str: string) => chalk.black(chalk.bgMagenta(` ${str} `))
colors[LogLevels.warning] = (str: string) => chalk.black(chalk.bgYellow(` ${str} `))


// TODO: parse payloads if there are no big chunks (data:application...)
export const extract = (body?: unknown): string | undefined => {
  return _.isPlainObject(body)
    ? JSON.stringify(body)
    : Array.isArray(body)
      ? body.join(', ')
      : body && _.isString(body) ? body : undefined
}

export default class Logger {

  private _levels: string[] = []

  private _correlation: string

  private _writer: Writer

  get correlation(): string {
    return this._correlation
  }

  set correlation(id: string) {
    this._correlation = id
  }

  get levels(): string[] {
    return this._levels
  }

  public constructor(levels: string[] = [], writer: Writer = 'console') {
    this._levels = levels
    this._writer = writer
    this.correlation = uuid()
  }

  public warning({ message }: WarningLog): void {
    const level = LogLevels.warning
    if (this.levels.includes(level)) {
      this.print({
        level,
        date: new Date().toISOString(),
        correlation: this.correlation,
        message
      })
    }
  }

  public error({ message, stack }: ErrorLog): void {
    const level = LogLevels.error
    if (this.levels.includes(level)) { 
      this.print({
        level,
        date: new Date().toISOString(),
        correlation: this.correlation,
        message,
        stack
      })
    }
  }

  public info({ type, message, body }: InfoLog): void {
    const level = LogLevels.info
    if (this.levels.includes(level)) {
      this.print({
        level,
        type: type || 'custom',
        date: new Date().toISOString(),
        correlation: this.correlation,
        message,
        body
      })
    }
  }

  private print(log: Log): void {
    if (this._writer === 'console') {
      const logType = log.type ? chalk.black(chalk.bgYellow(` ${log.type} `)) : ''
      const message = chalk.gray(log.message)
      const llf = colors[log.level](log.level.toUpperCase())
      console.info(`${chalk.gray(log.date)}\n${llf} ${logType} ${chalk.white(` ${this.correlation} `)}\n${message}\n`)
      if (!_.isEmpty(log.body)) {
        console.info(chalk.greenBright(extract(log.body)))
      }
    } else {
      // TODO: JSON to DataDog or something
      console.info(log)
    }
  }

}
