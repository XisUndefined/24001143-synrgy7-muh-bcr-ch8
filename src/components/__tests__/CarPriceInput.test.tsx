import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarPriceInput from '../CarPriceInput'

describe('CarPriceInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarPriceInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('200.000')).toBeInTheDocument()
  })

  it('displays error message when price is not provided', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Price/i)

    fireEvent.blur(input)

    expect(await screen.findByText(/Price is required/i)).toBeInTheDocument()
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

    expect(screen.getByLabelText(/Price/i)).toHaveValue('150.000')
  })

  it('updates value when typed in input', async () => {
    renderComponent()

    const input = screen.getByLabelText(/Price/i)

    fireEvent.change(input, { target: { value: '250000' } })

    expect(input).toHaveValue('250.000')
  })

  it('prevents non-numeric characters from being inputted', () => {
    renderComponent()

    const input = screen.getByLabelText(/Price/i)

    fireEvent.change(input, { target: { value: 'abc' } })

    expect(input).toHaveValue('')
  })

  it('prevents invalid paste content', () => {
    renderComponent()

    const input = screen.getByLabelText(/Price/i)
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
    })
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: {
        getData: () => 'abc',
      },
    })

    fireEvent(input, pasteEvent)

    expect(input).toHaveValue('')
  })

  it('allows valid paste content', () => {
    renderComponent()

    const input = screen.getByLabelText(/Price/i)
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
    })
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: {
        getData: () => '200000',
      },
    })

    fireEvent(input, pasteEvent)

    expect(input).toHaveValue('200.000')
  })

  it('prevents non-numeric keydown events', () => {
    renderComponent()

    const input = screen.getByLabelText(/Price/i)

    fireEvent.keyDown(input, {
      key: 'a',
      code: 'KeyA',
      keyCode: 65,
      charCode: 65,
    })

    expect(input).toHaveValue('')
  })

  it('allows numeric keydown events', () => {
    renderComponent()

    const input = screen.getByLabelText(/Price/i)

    fireEvent.keyDown(input, {
      key: '2',
      code: 'Digit2',
      keyCode: 50,
      charCode: 50,
    })

    expect(input).toHaveValue('')
  })
})
