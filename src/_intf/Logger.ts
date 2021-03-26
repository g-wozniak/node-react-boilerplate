import { LogTypes } from '../props'

export interface InfoLog {
  message: string
  type?: LogTypes
  body?: any
}

export interface WarningLog {
  message: string
}

export interface ErrorLog {
  message: string
  stack?: any
}

export interface Log {
  level: string
  date: string
  correlation: string
  message: string
  type?: string
  body?: any
  stack?: any
}