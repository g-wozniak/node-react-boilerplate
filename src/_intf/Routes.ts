import { RequestMethods } from '../props'

export interface ApiRoutes {
  [routeId: string]: ApiRoute
}

export interface ApiRoute {
  method: RequestMethods
  uri: string
  description?: string
}

export interface ApiEndpoints {
  [apiRouteId: string]: ApiEndpoint
}

export interface ApiEndpoint extends ApiRoute {
  binding: any
}