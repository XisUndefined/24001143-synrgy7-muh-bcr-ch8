import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Car } from '../../types/car'
import { ResponseError } from '../../types/response'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarForm from '../CarForm'

describe('CarForm', () => {
  const mockOnSubmit = jest.fn()
  const mockNavigate = jest.fn()

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }))

  const renderComponent = (props: {
    car?: Car
    error?: ResponseError | null
  }) =>
    render(
      <Router>
        <CarFormProvider>
          <CarForm
            onSubmit={mockOnSubmit}
            error={props.error || null}
            car={props.car}
          />
        </CarFormProvider>
      </Router>
    )

  it('renders all form inputs correctly', () => {
    renderComponent({})

    expect(screen.getByLabelText(/Manufacture/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Transmission/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Plate/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Driver Service/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Options/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Specs/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
  })

  it('displays error message when there is an error', () => {
    const error: ResponseError = { status: '400', message: 'An error occurred' }
    renderComponent({ error })

    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument()
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
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent({ car })

    expect(screen.getByLabelText(/Manufacture/i)).toHaveValue('Toyota')
    expect(screen.getByLabelText(/Model/i)).toHaveValue('Camry')
    expect(screen.getByLabelText(/Transmission/i)).toHaveValue('Automatic')
    expect(screen.getByLabelText(/Plate/i)).toHaveValue('B 9093 KJD')
    expect(screen.getByLabelText(/Year/i)).toHaveValue(2020)
    expect(screen.getByLabelText(/Price/i)).toHaveValue('100')
    expect(screen.getByLabelText(/Capacity/i)).toHaveValue(5)
    expect(screen.getByLabelText(/Type/i)).toHaveValue('Sedan')
    expect(screen.getByLabelText(/Category/i)).toHaveValue('medium')
    expect(screen.getByLabelText(/Description/i)).toHaveValue('A luxurious car')
  })

  it('calls onSubmit when the form is submitted', async () => {
    renderComponent({})

    fireEvent.click(screen.getByText(/Save/i))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })
  })

  it('disables Save button when form is invalid or not dirty', async () => {
    renderComponent({})

    const saveButton = screen.getByText(/Save/i)
    expect(saveButton).toBeDisabled()

    const manufactureInput = screen.getByLabelText(/Manufacture/i)
    fireEvent.change(manufactureInput, { target: { value: 'Toyota' } })

    expect(saveButton).not.toBeDisabled()
  })

  it('navigates back when Cancel button is clicked', () => {
    renderComponent({})

    fireEvent.click(screen.getByText(/Cancel/i))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
