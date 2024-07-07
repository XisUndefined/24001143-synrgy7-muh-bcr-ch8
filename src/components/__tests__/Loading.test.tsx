import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Loading from '../Loading'

describe('Loading', () => {
  const size = '20px'
  const bgSize = '100px'

  beforeEach(() => {
    render(<Loading size={size} bgSize={bgSize} />)
  })

  it('renders loading message correctly', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders three bouncing divs', () => {
    const bouncingDivs = screen.getAllByRole('status')
    expect(bouncingDivs.length).toBe(3)
    bouncingDivs.forEach((div) => {
      expect(div).toHaveStyle({ height: size, width: size })
      expect(div).toHaveClass('animate-bounce')
      expect(div).toHaveClass('rounded-full')
      expect(div).toHaveClass('bg-darkblue-700')
    })
  })

  it('renders container with correct style', () => {
    const container = screen.getByRole('alert')
    expect(container).toHaveStyle({ gap: `calc(${size}/4)`, height: bgSize })
    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('items-center')
    expect(container).toHaveClass('justify-center')
    expect(container).toHaveClass('bg-white')
    expect(container).toHaveClass('bg-opacity-10')
    expect(container).toHaveClass('dark:bg-black')
    expect(container).toHaveClass('dark:bg-opacity-10')
  })
})
