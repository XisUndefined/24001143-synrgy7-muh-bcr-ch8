import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Route, Routes, MemoryRouter } from 'react-router-dom'
import Breadcrumb from '../Breadcrumb'

describe('Breadcrumb', () => {
  const renderComponent = (initialEntries: string[]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/admin/*" element={<Breadcrumb />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('renders breadcrumb for dashboard path', () => {
    renderComponent(['/admin/dashboard'])

    expect(screen.getByText('dashboard')).toBeInTheDocument()
  })

  it('renders breadcrumb for cars path', () => {
    renderComponent(['/admin/cars'])

    expect(screen.getByText('cars')).toBeInTheDocument()
  })

  it('renders breadcrumb for cars category path', () => {
    renderComponent(['/admin/cars/category'])

    expect(screen.getByText('cars')).toBeInTheDocument()
    expect(screen.getByText('category')).toBeInTheDocument()
  })

  it('renders breadcrumb for editing a car', () => {
    renderComponent(['/admin/cars/123e4567-e89b-12d3-a456-426614174000'])

    expect(screen.getByText('cars')).toBeInTheDocument()
    expect(screen.getByText('Edit Car')).toBeInTheDocument()
  })

  it('renders correct link for dashboard path', () => {
    renderComponent(['/admin/dashboard'])

    expect(screen.getByText('dashboard').closest('a')).toHaveAttribute(
      'href',
      '/admin/dashboard'
    )
  })

  it('renders correct link for cars path', () => {
    renderComponent(['/admin/cars'])

    expect(screen.getByText('cars').closest('a')).toHaveAttribute(
      'href',
      '/admin/cars'
    )
  })

  it('renders correct link for cars category path', () => {
    renderComponent(['/admin/cars/category'])

    expect(screen.getByText('cars').closest('a')).toHaveAttribute(
      'href',
      '/admin/cars'
    )
  })

  it('renders correct link for editing a car', () => {
    renderComponent(['/admin/cars/123e4567-e89b-12d3-a456-426614174000'])

    expect(screen.getByText('cars').closest('a')).toHaveAttribute(
      'href',
      '/admin/cars'
    )
    expect(screen.getByText('Edit Car').closest('a')).toHaveAttribute(
      'href',
      '/admin/cars/123e4567-e89b-12d3-a456-426614174000'
    )
  })

  it('renders correct class for dashboard link', () => {
    renderComponent(['/admin/dashboard'])
    const dashboardLink = screen.getByText('dashboard')
    expect(dashboardLink).toHaveClass('first-letter:capitalize')
    expect(dashboardLink).not.toHaveClass('font-display font-light')
  })

  it('renders correct class for cars link', () => {
    renderComponent(['/admin/cars'])
    const carsLink = screen.getByText('cars')
    expect(carsLink).toHaveClass('first-letter:capitalize')
    expect(carsLink).not.toHaveClass('font-display font-light')
  })

  it('renders correct class for cars category link', () => {
    renderComponent(['/admin/cars/category'])
    const carsLink = screen.getByText('cars')
    const categoryText = screen.getByText('category')

    expect(carsLink).toHaveClass('first-letter:capitalize')
    expect(carsLink).not.toHaveClass('font-display font-light')
    expect(categoryText).toHaveClass('first-letter:capitalize')
    expect(categoryText).toHaveClass('font-display font-light')
  })

  it('renders correct class for editing a car link', () => {
    renderComponent(['/admin/cars/123e4567-e89b-12d3-a456-426614174000'])
    const carsLink = screen.getByText('cars')
    const editCarLink = screen.getByText('Edit Car')

    expect(carsLink).toHaveClass('first-letter:capitalize')
    expect(carsLink).not.toHaveClass('font-display font-light')
    expect(editCarLink).toHaveClass('first-letter:capitalize')
    expect(editCarLink).toHaveClass('font-display font-light')
  })

  it('renders correct class for cars link with other paths', () => {
    renderComponent(['/admin/cars/other-path'])
    const carsLink = screen.getByText('cars')
    const otherPathLink = screen.getByText('other-path')

    expect(carsLink).toHaveClass('first-letter:capitalize')
    expect(carsLink).not.toHaveClass('font-display font-light')
    expect(otherPathLink).toHaveClass('first-letter:capitalize')
    expect(otherPathLink).not.toHaveClass('font-display font-light')
  })

  it('renders correct class for nested paths', () => {
    renderComponent(['/admin/cars/category/another-path'])
    const carsLink = screen.getByText('cars')
    const categoryText = screen.getByText('category')
    const anotherPathLink = screen.getByText('another-path')

    expect(carsLink).toHaveClass('first-letter:capitalize')
    expect(carsLink).not.toHaveClass('font-display font-light')
    expect(categoryText).toHaveClass('first-letter:capitalize')
    expect(categoryText).not.toHaveClass('font-display font-light')
    expect(anotherPathLink).toHaveClass('first-letter:capitalize')
    expect(anotherPathLink).toHaveClass('font-display font-light')
  })

  it('renders correct class for UUID path', () => {
    renderComponent(['/admin/cars/123e4567-e89b-12d3-a456-426614174000'])
    const editCarLink = screen.getByText('Edit Car')

    expect(editCarLink).toHaveClass('first-letter:capitalize')
    expect(editCarLink).toHaveClass('font-display font-light')
  })

  it('renders correct class for non-UUID path', () => {
    renderComponent(['/admin/cars/non-uuid-path'])
    const nonUuidPathLink = screen.getByText('non-uuid-path')

    expect(nonUuidPathLink).toHaveClass('first-letter:capitalize')
    expect(nonUuidPathLink).not.toHaveClass('font-display font-light')
  })
})
