/* Request types supported by the system */
export enum RequestMethods {
  'GET' = 'get',
  'POST' = 'post',
  'DELETE' = 'delete',
  'PATCH' = 'patch'
}

/* Custom headers of the application */
export enum Headers {
  XCorrelation = 'x-correlation'
}

/* Log levels used by logger in the app */
export enum LogLevels {
  error = 'error',
  warning = 'warning',
  info = 'info'
}

/* Types of logs used by logger in the app */
export enum LogTypes {
  request = 'request',
  response = 'response',
  startup = 'startup',
  database = 'database',
  custom = 'custom'
}
