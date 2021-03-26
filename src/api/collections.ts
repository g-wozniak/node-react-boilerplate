import { FilterQuery } from 'mongoose' 
import { MongoServiceCollection, MongoServiceResult } from '@intf/Services'

import { NameSchema, NameItem, schema as nameSchema } from './collections/name'
import MongoService from '../server/services/mongo'

interface MongoNameCollection extends MongoServiceCollection {
  insert(item: NameItem): Promise<MongoServiceResult>
  findOne(query: FilterQuery<NameSchema>): Promise<NameSchema | null>
}

export interface Collections {
  name: () => MongoNameCollection
}

const collections = (service: MongoService): Collections => ({
  name: (): MongoNameCollection => {
    return {
      insert: async (item: NameItem): Promise<MongoServiceResult> =>
        service.insert('name', nameSchema, item),
      findOne: async (query: FilterQuery<NameSchema>): Promise<NameSchema | null> =>
        service.findOne('name', nameSchema, query)
    }
  }
})

export default collections
