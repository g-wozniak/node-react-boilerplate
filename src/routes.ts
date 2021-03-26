import { ApiRoutes } from './_intf/Routes'
import { RequestMethods } from './props'

export enum Routes {
  Name = 'Name'
}

const routes: ApiRoutes = {}
routes[Routes.Name] = {
  uri: '/api/name',
  description: 'Dummy example endpoint inserting name',
  method: RequestMethods.POST
}

export default routes

