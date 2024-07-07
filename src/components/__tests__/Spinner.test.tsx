import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Spinner from '../Spinner'

describe('Spinner', () => {
  const size = '50px'
  const borderSize = '5px'

  it('renders loading message correctly', () => {
    render(<Spinner size={size} borderSize={borderSize} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders spinner with correct styles', () => {
    render(<Spinner size={size} borderSize={borderSize} />)
    const spinnerDiv = screen.getByRole('status')

    expect(spinnerDiv).toHaveStyle({
      height: size,
      width: size,
      borderWidth: borderSize,
    })
    expect(spinnerDiv).toHaveClass('animate-spin')
    expect(spinnerDiv).toHaveClass('rounded-full')
    expect(spinnerDiv).toHaveClass('border-neutral-300')
    expect(spinnerDiv).toHaveClass('border-t-darkblue-700')
  })
})
