import { ObjectId } from 'bson'
import { Schema, Document } from 'mongoose'

import { MongoCollectionInsertArgs } from '@intf/Services'

export interface NameItem extends MongoCollectionInsertArgs {
  name: string
  surname: string
}

export interface NameSchema extends Document {
  _id: ObjectId
  name: string
  surname: string
}

export const schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: false
  }
}, { versionKey: false, collection: 'names' })
