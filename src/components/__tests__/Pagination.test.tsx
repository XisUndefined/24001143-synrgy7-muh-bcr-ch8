import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from '../Pagination'

describe('Pagination', () => {
  const mockHandlePageClick = jest.fn()

  const renderComponent = (page: number, total_page: number) => {
    return render(
      <Pagination
        page={page}
        total_page={total_page}
        handlePageClick={mockHandlePageClick}
      />
    )
  }

  beforeEach(() => {
    mockHandlePageClick.mockClear()
  })

  it('renders pagination buttons correctly for less than 5 pages', () => {
    renderComponent(1, 3)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders pagination buttons correctly for more than 5 pages', () => {
    renderComponent(1, 7)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('disables previous button on the first page', () => {
    renderComponent(1, 7)

    expect(
      screen.getByRole('button', { name: /FiChevronsLeft/i })
    ).toBeDisabled()
  })

  it('disables next button on the last page', () => {
    renderComponent(7, 7)

    expect(
      screen.getByRole('button', { name: /FiChevronsRight/i })
    ).toBeDisabled()
  })

  it('calls handlePageClick with the correct page number when a page button is clicked', () => {
    renderComponent(1, 7)

    fireEvent.click(screen.getByText('2'))
    expect(mockHandlePageClick).toHaveBeenCalledWith(2)

    fireEvent.click(screen.getByText('3'))
    expect(mockHandlePageClick).toHaveBeenCalledWith(3)
  })

  it('calls handlePageClick with the correct page number when previous or next button is clicked', () => {
    renderComponent(3, 7)

    fireEvent.click(screen.getByRole('button', { name: /FiChevronsLeft/i }))
    expect(mockHandlePageClick).toHaveBeenCalledWith(2)

    fireEvent.click(screen.getByRole('button', { name: /FiChevronsRight/i }))
    expect(mockHandlePageClick).toHaveBeenCalledWith(4)
  })

  it('renders ellipsis correctly when pages are more than 5', () => {
    renderComponent(5, 10)

    expect(screen.getAllByText('...').length).toBe(2)
  })
})
