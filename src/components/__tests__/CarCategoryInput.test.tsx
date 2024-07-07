import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarCategoryInput from '../CarCategoryInput'

describe('CarCategoryInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarCategoryInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Pilih Kategori')).toBeInTheDocument()
  })

  it('displays error message when category is not selected', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Category/i)

    fireEvent.blur(input)

    expect(await screen.findByText(/Category is required/i)).toBeInTheDocument()
  })

  it('does not display error message when category is valid', async () => {
    renderComponent()

    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('medium'))

    expect(screen.queryByText(/Category is required/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/Category/i)).toHaveValue('medium')
  })

  it('toggles dropdown on button click', () => {
    renderComponent()

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText('small')).toBeInTheDocument()
    expect(screen.getByText('medium')).toBeInTheDocument()
    expect(screen.getByText('large')).toBeInTheDocument()
  })

  it('displays default value from car prop', () => {
    const car: Car = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      created_by: 'superadmin@gmail.com',
      manufacture: 'Toyota',
      model: 'Camry',
      transmission: 'Automatic',
      plate: 'B 9093 KJD',
      year: 2020,
      driver_service: false,
      rent_per_day: 200000,
      capacity: 5,
      type: 'Sedan',
      category: 'medium',
      description: 'A luxurious car',
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent(car)

    expect(screen.getByLabelText(/Category/i)).toHaveValue('medium')
  })

  it('selects category from dropdown', () => {
    renderComponent()

    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('large'))
    expect(screen.getByLabelText(/Category/i)).toHaveValue('large')

    fireEvent.click(button)
    fireEvent.click(screen.getByText('medium'))
    expect(screen.getByLabelText(/Category/i)).toHaveValue('medium')

    fireEvent.click(button)
    fireEvent.click(screen.getByText('small'))
    expect(screen.getByLabelText(/Category/i)).toHaveValue('small')
  })
})
