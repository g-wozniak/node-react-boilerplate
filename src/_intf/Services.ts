import { Document, Mongoose } from 'mongoose'

export type MongoServiceResult = string | undefined

export type MongoCollectionInsertArgs = any // empty

export interface MongoServiceCollection {
  insert(data: MongoCollectionInsertArgs): Promise<MongoServiceResult>
  findOne(query: any): Promise<Document | null>
}

export type MongoConnector = {
  mongoose: Mongoose,
  stop(): Promise<void>
}

export type MongoSimulator = {
  connectionString: string
  stop(): Promise<void>
}
export interface MongoConfig {
  database: string
  hostname: string
  port: number
  timeout: number
}

