import * as React from 'react'

export interface Props {
  children?: any
}

const Dummy = (): JSX.Element => {
  return (
    <h1 className="c-dummy">Hello World!!!</h1>
  )
}

export default Dummy
