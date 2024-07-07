import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarOptionsInput from '../CarOptionsInput'

describe('CarOptionsInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarOptionsInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Options/i)).toBeInTheDocument()
    expect(screen.getByText('Add Option')).toBeInTheDocument()
  })

  it('displays default values from car prop', () => {
    const car: Car = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      created_by: 'user1',
      manufacture: 'Toyota',
      model: 'Camry',
      transmission: 'Automatic',
      plate: 'XYZ 123',
      year: 2020,
      driver_service: false,
      rent_per_day: 100,
      capacity: 5,
      type: 'Sedan',
      category: 'Luxury',
      description: 'A luxurious car',
      options: JSON.stringify(['Option1', 'Option2']),
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent(car)

    expect(screen.getByDisplayValue('Option1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Option2')).toBeInTheDocument()
  })

  it('adds a new option when "Add Option" button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Add Option'))

    expect(screen.getAllByPlaceholderText('').length).toBe(1)
  })

  it('removes an option when the remove button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Add Option'))
    expect(screen.getAllByPlaceholderText('').length).toBe(1)

    fireEvent.change(screen.getAllByPlaceholderText('')[0], {
      target: { value: 'Option1' },
    })

    fireEvent.click(screen.getAllByRole('img', { hidden: true })[0])

    expect(screen.queryByDisplayValue('Option1')).not.toBeInTheDocument()
  })

  it('resizes input width based on text', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Add Option'))
    const input = screen.getAllByPlaceholderText('')[0]
    fireEvent.change(input, { target: { value: 'TestOption' } })

    expect(input).toHaveStyle('width: 1em')
  })
})
