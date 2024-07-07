import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarManufactureInput from '../CarManufactureInput'

describe('CarManufactureInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarManufactureInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Manufacture/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Mercedes')).toBeInTheDocument()
  })

  it('displays error message when manufacture is not provided', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Manufacture/i)

    fireEvent.blur(input)

    expect(
      await screen.findByText(/Manufacture is required/i)
    ).toBeInTheDocument()
  })

  it('does not display error message when manufacture is valid', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Manufacture/i)

    fireEvent.change(input, { target: { value: 'Mercedes' } })
    fireEvent.blur(input)

    expect(
      screen.queryByText(/Manufacture is required/i)
    ).not.toBeInTheDocument()
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
      rent_per_day: 200000,
      capacity: 5,
      type: 'Sedan',
      category: 'medium',
      description: 'A luxurious car',
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent(car)

    expect(screen.getByLabelText(/Manufacture/i)).toHaveValue('Toyota')
  })

  it('updates value when typed in input', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Manufacture/i)

    fireEvent.change(input, { target: { value: 'Honda' } })

    expect(input).toHaveValue('Honda')
  })
})
