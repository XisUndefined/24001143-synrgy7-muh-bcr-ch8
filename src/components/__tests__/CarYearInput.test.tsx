import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarYearInput from '../CarYearInput'

describe('CarYearInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarYearInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('2012')).toBeInTheDocument()
  })

  it('displays error message when year is not provided', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Year/i)

    fireEvent.blur(input)

    expect(await screen.findByText(/Year is required/i)).toBeInTheDocument()
  })

  it('displays error message when year is invalid', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Year/i)

    fireEvent.change(input, { target: { value: '-1' } })
    fireEvent.blur(input)

    expect(
      await screen.findByText(/Year must be positive number/i)
    ).toBeInTheDocument()
  })

  it('does not display error message when year is valid', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Year/i)

    fireEvent.change(input, { target: { value: '2020' } })
    fireEvent.blur(input)

    expect(screen.queryByText(/Year is required/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/Year must be positive number/i)
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
      rent_per_day: 150000,
      capacity: 5,
      type: 'Sedan',
      category: 'medium',
      description: 'A luxurious car',
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent(car)

    expect(screen.getByLabelText(/Year/i)).toHaveValue(2020)
  })

  it('updates value when typed in input', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Year/i)

    fireEvent.change(input, { target: { value: '2021' } })

    expect(input).toHaveValue(2021)
  })
})
