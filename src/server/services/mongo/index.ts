import { Document, FilterQuery, Mongoose, Schema } from 'mongoose' 

import Logger from '../../logger'
import { MongoServiceResult } from '@intf/Services'
import { KeyAny } from '@intf/Generic'


export default class MongoService {

  private _mongoose: Mongoose

  private _logger: Logger

  constructor(mongoose: Mongoose, logger: Logger) {
    this._mongoose = mongoose
    this._logger = logger
  }

  public async dropAll(): Promise<void> {
    return await this._mongoose.connection.dropDatabase()
  }

  public async findOne(schemaName: string, schema: Schema, query: FilterQuery<Document>): Promise<any> {
    const _m = this._mongoose.model<Document>(schemaName, schema)
    return await _m.findOne(query)
  }

  public async insert(schemaName: string, schema: Schema, data: KeyAny): Promise<MongoServiceResult> {
    return await this.wrapper(async () => {
      const _m = this._mongoose.model<Document>(schemaName, schema)
      const model = new _m(data)
      return await model.save()
    })
  }

  private async wrapper(fn: () => Promise<Document>): Promise<MongoServiceResult> {
    let result: MongoServiceResult
    try {
      const json = JSON.parse(JSON.stringify(await fn()))
      result = json._id
    } catch (err) {
      this._logger.error({
        message: err.message,
        stack: err.stack
      })
    }
    return result
  }

}
