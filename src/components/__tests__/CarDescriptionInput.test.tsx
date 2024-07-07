import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Car } from '../../types/car'
import CarFormProvider from '../../contexts/CarFormProvider'
import CarDescriptionInput from '../CarDescriptionInput'

// Mock ReactQuill component
interface ReactQuillProps {
  value: string
  onChange: (value: string) => void
}

jest.mock('react-quill', () => (props: ReactQuillProps) => (
  <textarea
    data-testid="quill-editor"
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
  />
))

describe('CarDescriptionInput', () => {
  const renderComponent = (car?: Car) =>
    render(
      <CarFormProvider>
        <CarDescriptionInput car={car} />
      </CarFormProvider>
    )

  it('renders input and label correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByTestId('quill-editor')).toBeInTheDocument()
  })

  it('displays error message when description is empty', async () => {
    renderComponent()

    const editor = screen.getByTestId('quill-editor')

    fireEvent.change(editor, { target: { value: '' } })
    fireEvent.blur(editor)

    expect(
      await screen.findByText(/Description is required/i)
    ).toBeInTheDocument()
  })

  it('does not display error message when description is valid', async () => {
    renderComponent()

    const editor = screen.getByTestId('quill-editor')

    fireEvent.change(editor, {
      target: { value: 'This is a valid description' },
    })
    fireEvent.blur(editor)

    await waitFor(() => {
      expect(
        screen.queryByText(/Description is required/i)
      ).not.toBeInTheDocument()
    })
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
      category: 'medium',
      description: 'A luxurious car',
      created_at: '2021-01-01T07:00:00Z',
      updated_at: '2021-01-01T07:00:00Z',
    }

    renderComponent(car)

    expect(screen.getByTestId('quill-editor')).toHaveValue('A luxurious car')
  })

  it('updates value when typed in editor', async () => {
    renderComponent()

    const editor = screen.getByTestId('quill-editor')

    fireEvent.change(editor, { target: { value: 'Updated description' } })

    await waitFor(() => {
      expect(editor).toHaveValue('Updated description')
    })
  })
})
