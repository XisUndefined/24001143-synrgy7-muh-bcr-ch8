import { useContext } from 'react'
import { CustomerCarContext } from '../contexts/CustomerCarProvider'

const useCustomerCar = () => {
  const context = useContext(CustomerCarContext)
  if (!context) {
    throw new Error('useCustomerCar must be used within an CustomerCarProvider')
  }
  const {
    page,
    setPage,
    cars,
    setCars,
    searchParams,
    setSearchParams,
    resErrors,
    setResErrors,
    navigate,
    goToNextPage,
    goToPrevPage,
    parseSearchParams,
  } = context
  return {
    page,
    setPage,
    cars,
    setCars,
    searchParams,
    setSearchParams,
    resErrors,
    setResErrors,
    navigate,
    goToNextPage,
    goToPrevPage,
    parseSearchParams,
  }
}

export default useCustomerCar
