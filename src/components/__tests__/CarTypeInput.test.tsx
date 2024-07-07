import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarTypeInput from '../CarTypeInput'

describe('CarTypeInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarTypeInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Sedan')).toBeInTheDocument()
  })

  it('displays error message when type is not provided', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Type/i)

    fireEvent.blur(input)

    expect(await screen.findByText(/Type is required/i)).toBeInTheDocument()
  })

  it('does not display error message when type is valid', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Type/i)

    fireEvent.change(input, { target: { value: 'SUV' } })
    fireEvent.blur(input)

    expect(screen.queryByText(/Type is required/i)).not.toBeInTheDocument()
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
      driver_service: true,
      rent_per_day: 150000,
      capacity: 5,
      type: 'Sedan',
      category: 'medium',
      description: 'A luxurious car',
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent(car)

    expect(screen.getByLabelText(/Type/i)).toHaveValue('Sedan')
  })

  it('updates value when typed in input', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Type/i)

    fireEvent.change(input, { target: { value: 'Convertible' } })

    expect(input).toHaveValue('Convertible')
  })
})
