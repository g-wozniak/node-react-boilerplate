import * as React from 'react'
import MetaTags from 'react-meta-tags'


import { RouteProps } from '../_intf/Common'

import MasterLayout from '../pages/layouts/master'


const RouteWrapper = (props: RouteProps): JSX.Element => {
  // const locale = useSelector((state: Reducers) => state.r_app.locale)
  const Component = props.component
  const ComponentToBeRendered = <Component {...props} />
  return (
    <>
      <MetaTags>
        <title>page title</title>
      </MetaTags>
      <MasterLayout {...props}>{ComponentToBeRendered}</MasterLayout>
    </>
  )
}

export default RouteWrapper
