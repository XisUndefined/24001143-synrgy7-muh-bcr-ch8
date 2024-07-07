import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarCapacityInput from '../CarCapacityInput'

describe('CarCapacityInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarCapacityInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('4')).toBeInTheDocument()
  })

  it('displays error message when capacity is invalid', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Capacity/i)

    fireEvent.change(input, { target: { value: '-1' } })
    fireEvent.blur(input)

    expect(
      await screen.findByText(/Capacity must be positive number/i)
    ).toBeInTheDocument()
  })

  it('does not display error message when capacity is valid', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Capacity/i)

    fireEvent.change(input, { target: { value: '4' } })
    fireEvent.blur(input)

    expect(
      screen.queryByText(/Capacity must be positive number/i)
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
      driver_service: false,
      rent_per_day: 200000,
      capacity: 5,
      type: 'Sedan',
      category: 'small',
      description: 'A luxurious car',
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent(car)

    expect(screen.getByLabelText(/Capacity/i)).toHaveValue(5)
  })
})
