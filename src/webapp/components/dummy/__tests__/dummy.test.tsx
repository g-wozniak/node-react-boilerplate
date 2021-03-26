import * as React from 'react'
import { render, screen } from '@testing-library/react'

import Dummy from '..'

describe('Dummy', () => {
  it('should return header text', () => {
    render(<Dummy />)
    expect(screen.getByRole('heading', { name: /Hello World/i })).toBeInTheDocument()
  })
})