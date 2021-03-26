import { ApiEndpoints } from '@intf/Routes'
import routes, { Routes } from '../routes'

import { insert as insertName } from './controllers/name'

const endpoints: ApiEndpoints = {}
endpoints[Routes.Name] = {
  ...routes[Routes.Name],
  binding: insertName
}

export default endpoints

