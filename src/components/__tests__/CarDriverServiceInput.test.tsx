import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarDriverServiceInput from '../CarDriverServiceInput'

describe('CarDriverServiceInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarDriverServiceInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Driver Service/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Pilih Tipe Driver')).toBeInTheDocument()
  })

  it('displays error message when driver service is not selected', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Driver Service/i)

    fireEvent.blur(input)

    expect(
      await screen.findByText(/Driver service is required/i)
    ).toBeInTheDocument()
  })

  it('does not display error message when driver service is valid', async () => {
    renderComponent()

    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('Dengan Sopir'))

    expect(
      screen.queryByText(/Driver service is required/i)
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText(/Driver Service/i)).toHaveValue('Dengan Sopir')
  })

  it('toggles dropdown on button click', () => {
    renderComponent()

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText('Dengan Sopir')).toBeInTheDocument()
    expect(screen.getByText('Tanpa Sopir')).toBeInTheDocument()
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

    expect(screen.getByLabelText(/Driver Service/i)).toHaveValue('Dengan Sopir')
  })

  it('selects driver service from dropdown', () => {
    renderComponent()

    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('Tanpa Sopir'))

    expect(screen.getByLabelText(/Driver Service/i)).toHaveValue('Tanpa Sopir')
  })
})
