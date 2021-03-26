import { KeyAny } from '@intf/Generic'

interface ErrorResponse {
  code: number
  message: string
  data?: KeyAny
}

export default class ServerError extends Error {

  public message: string

  public data: KeyAny | undefined

  private _code: number

  get code(): number {
    return this._code
  }

  constructor(code: number, message: string, data?: KeyAny) {
    super(code.toString())
    this.name = this.constructor.name
    this._code = code
    this.data = data
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }

  public getResponse(): ErrorResponse {
    const r: ErrorResponse = {
      code: this._code,
      message: this.message
    }
    if (this.data) {
      r.data = this.data
    }
    return r
  }
}
