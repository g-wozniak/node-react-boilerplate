import * as React from 'react'
import Dummy from '@webapp/components/dummy'

export interface Props {
  children?: any
}

const MasterLayout = (props: Props): JSX.Element => {
  return (
    <>
      <h1>Masthead</h1>
      <Dummy />
      {props.children}
    </>
  )
}

export default MasterLayout
