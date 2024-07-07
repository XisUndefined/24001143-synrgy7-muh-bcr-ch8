// CarPlateInput.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarPlateInput from '../CarPlateInput'

describe('CarPlateInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarPlateInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Plate/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('B 7890 KDR')).toBeInTheDocument()
  })

  it('displays error message when plate is not provided', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Plate/i)

    fireEvent.blur(input)

    expect(await screen.findByText(/Plate is required/i)).toBeInTheDocument()
  })

  it('displays error message when plate format is invalid', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Plate/i)

    fireEvent.change(input, { target: { value: 'Invalid Plate' } })
    fireEvent.blur(input)

    expect(await screen.findByText(/Invalid plate format/i)).toBeInTheDocument()
  })

  it('does not display error message when plate is valid', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Plate/i)

    fireEvent.change(input, { target: { value: 'B 1234 XYZ' } })
    fireEvent.blur(input)

    expect(screen.queryByText(/Plate is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Invalid plate format/i)).not.toBeInTheDocument()
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

    expect(screen.getByLabelText(/Plate/i)).toHaveValue('B 9093 KJD')
  })

  it('updates value when typed in input', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Plate/i)

    fireEvent.change(input, { target: { value: 'D 5678 ABC' } })

    expect(input).toHaveValue('D 5678 ABC')
  })
})
