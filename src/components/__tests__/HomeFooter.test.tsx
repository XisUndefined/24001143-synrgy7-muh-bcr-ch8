import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeFooter from '../HomeFooter'

describe('HomeFooter', () => {
  beforeEach(() => {
    render(<HomeFooter />)
  })

  it('renders address correctly', () => {
    expect(
      screen.getByText(/Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/binarcarrental@gmail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/081-233-334-808/i)).toBeInTheDocument()
  })

  it('renders links correctly', () => {
    expect(screen.getByText(/Our services/i)).toHaveAttribute(
      'href',
      '#services'
    )
    expect(screen.getByText(/Why Us/i)).toHaveAttribute('href', '#about')
    expect(screen.getByText(/Testimonial/i)).toHaveAttribute(
      'href',
      '#testimonial'
    )
    expect(screen.getByText(/FAQ/i)).toHaveAttribute('href', '#faq')
  })

  it('renders social media icons correctly', () => {
    expect(screen.getByAltText(/facebook/i)).toBeInTheDocument()
    expect(screen.getByAltText(/instagram/i)).toBeInTheDocument()
    expect(screen.getByAltText(/twitter/i)).toBeInTheDocument()
    expect(screen.getByAltText(/email/i)).toBeInTheDocument()
    expect(screen.getByAltText(/twitch/i)).toBeInTheDocument()
  })

  it('renders copyright correctly', () => {
    expect(screen.getByText(/Copyright Binar 2022/i)).toBeInTheDocument()
  })

  it('renders logo link correctly', () => {
    expect(screen.getByText(/logo/i)).toHaveAttribute('href', '#home')
  })
})
