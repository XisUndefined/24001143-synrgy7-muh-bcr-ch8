import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarSpecsInput from '../CarSpecsInput'

describe('CarSpecsInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarSpecsInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Specs/i)).toBeInTheDocument()
    expect(screen.getByText('Add Spec')).toBeInTheDocument()
  })

  it('displays default values from car prop', () => {
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
      specs: JSON.stringify(['Spec1', 'Spec2']),
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent(car)

    expect(screen.getByDisplayValue('Spec1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Spec2')).toBeInTheDocument()
  })

  it('adds a new spec when "Add Spec" button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Add Spec'))

    expect(screen.getAllByPlaceholderText('').length).toBe(1)
  })

  it('removes a spec when the remove button is clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Add Spec'))
    expect(screen.getAllByPlaceholderText('').length).toBe(1)

    fireEvent.change(screen.getAllByPlaceholderText('')[0], {
      target: { value: 'Spec1' },
    })

    fireEvent.click(screen.getAllByRole('img', { hidden: true })[0])

    expect(screen.queryByDisplayValue('Spec1')).not.toBeInTheDocument()
  })

  it('resizes input width based on text', () => {
    renderComponent()

    fireEvent.click(screen.getByText('Add Spec'))
    const input = screen.getAllByPlaceholderText('')[0]
    fireEvent.change(input, { target: { value: 'TestSpec' } })

    expect(input).toHaveStyle('width: 1em')
  })
})
