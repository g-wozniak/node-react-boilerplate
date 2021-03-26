import { ClientFunction } from 'testcafe'
import { screen } from '@testing-library/testcafe'

import system from '../../server/system'
import { System } from '@intf/Server'

let app: System

const port = 4005
const hostname = `http://localhost:${port}`

fixture `Master layout`
  .page `${hostname}`
    .before(async () => {
      app = await system({ port })
    })
    .after(async () => app && await app.closeAll())

test('dummy text exists', async (t) => {
  await t.expect(screen.getByText('Hello World!!!').exists).ok()
})
